package main

import (
	"encoding/json"
	"log"
	"net/http"
	"regexp"
	"strings"

	"github.com/PuerkitoBio/goquery"
)

func main() {
	// Request the HTML page.
	res, err := http.Get("https://slay-the-spire.fandom.com/wiki/Ironclad_Cards")
	if err != nil {
		log.Fatal(err)
	}
	defer res.Body.Close()
	if res.StatusCode != 200 {
		log.Fatalf("status code error: %d %s", res.StatusCode, res.Status)
	}

	// Load the HTML document
	doc, err := goquery.NewDocumentFromReader(res.Body)
	if err != nil {
		log.Fatal(err)
	}

	var rawCards []map[string]string
	doc.Find(".article-table").Each(func(i int, table *goquery.Selection) {
		index := map[int]string{}
		table.Find("tr").Each(func(ii int, tr *goquery.Selection) {
			if ii == 0 {
				tr.Children().Each(func(col int, td *goquery.Selection) {
					index[col] = strings.TrimSpace(td.Text())
				})
			} else {
				// card := &CardRaw{}
				m := map[string]string{}
				tr.Children().Each(func(col int, td *goquery.Selection) {
					field := index[col]
					if field == "Picture" {
						m[field] = strings.TrimSpace(td.Find("img").First().AttrOr("data-src", ""))
						if len(m[field]) == 0 {
							m[field] = strings.TrimSpace(td.Find("img").First().AttrOr("src", ""))
						}
					} else {
						m[field] = strings.TrimSpace(td.Text())
					}
				})

				rawCards = append(rawCards, m)
			}
		})
	})

	b, _ := json.MarshalIndent(rawCards, "", "  ")
	src := string(b)
	reg := regexp.MustCompile(`\"Energy\"\:\W\"(\d+)\"`)
	src = reg.ReplaceAllStringFunc(src, func(m string) string {
		parts := reg.FindStringSubmatch(m)
		return "\"Energy\": " + parts[1]
	})

	reg = regexp.MustCompile(`\"Energy\"\:\W\"(\d+)\((\d+)\)\"`)
	log.Println(reg.ReplaceAllStringFunc(src, func(m string) string {
		parts := reg.FindStringSubmatch(m)
		return "\"Energy\": " + parts[1] + ",\n    \"EnergyPlus\": " + parts[2]
	}))

	log.Println(len(rawCards))

	// _ = ioutil.WriteFile("IronClad_Cards.json", file, 0644)
}

/* func parseTr(children *goquery.Selection) (card *Card, err error) {
	name := trim(0, children)
	if len(name) == 0 {
		return nil, errors.New("card name not found")
	}

	var rarity uint
	rarityStr := trim(2, children)
	switch rarityStr {
	case "Starter":
		rarity = 0
	case "Common":
		rarity = 1
	case "Uncommon":
		rarity = 2
	case "Rare":
		rarity = 3
	case "Special":
		rarity = 4
	default:
		return nil, fmt.Errorf("unknown rarity: %s", rarityStr)
	}

	var ctype uint
	ctypeStr := trim(3, children)
	switch ctypeStr {
	case "Attack":
		ctype = 0
	case "Skill":
		ctype = 1
	case "Power":
		ctype = 2
	case "Status":
		rarity = 3
	case "Curse":
		rarity = 4
	case "Special Curse":
		rarity = 5
	default:
		return nil, fmt.Errorf("unknown card type: %s", ctypeStr)
	}

	desIdx := 5

	var energyPlus int64
	var energy int64

	if ctype > 2 {
		desIdx = 4
		energy = -1
		energyPlus = energy
	} else {

		energyStr := trim(4, children)
		if energyStr == "X" {
			energy = -10
			energyPlus = -10
		} else if energyStr == "" {
			energy = -1
			energyPlus = -1
		} else {
			energy, err = strconv.ParseInt(energyStr, 10, 16)
			if err != nil {
				reg := regexp.MustCompile(`(\d)\((\d)\)`)
				arr := reg.FindStringSubmatch(energyStr)

				if len(arr) < 2 {
					return nil, fmt.Errorf("can not parse energy: %s of %s", energyStr, name)
				}
				energy, err = strconv.ParseInt(arr[1], 10, 16)
				if err != nil {
					return nil, fmt.Errorf("can not parse energy: %s of %s", energyStr, name)
				}
				energyPlus, err = strconv.ParseInt(arr[2], 10, 16)
				if err != nil {
					return nil, fmt.Errorf("can not parse energy: %s of %s", energyStr, name)
				}
			} else {
				energyPlus = energy
			}
		}
	}

	img, exist := children.Eq(1).Find("img").First().Attr("data-src")

	if exist == false {
		img, exist = children.Eq(1).Find("img").First().Attr("src")
		if exist == false || len(img) == 0 {
			return nil, fmt.Errorf("image url not found: %s", name)
		}
	}

	desc := trim(desIdx, children)
	if len(desc) == 0 {
		return nil, fmt.Errorf("card description not found: %s", desc)
	}

	card = &Card{Name: name, URL: img, Rarity: rarity, CType: ctype, Energy: int(energy), EnergyPlus: int(energyPlus), Description: desc}
	return
}

func trim(index int, children *goquery.Selection) string {
	return strings.TrimSpace(children.Eq(index).Text())
} */

// CardRaw data instance
type CardRaw struct {
	Name        string
	URL         string
	Rarity      string
	CType       string
	Energy      string
	Description string
}
