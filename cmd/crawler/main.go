package main

import (
	"fmt"
	"log"
	"net/http"
	"strconv"
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

	// Find the review items
	trim := func(index int, children *goquery.Selection) string {
		return strings.TrimSpace(children.Eq(index).Text())
	}

	doc.Find(".article-table tr").Each(func(i int, tr *goquery.Selection) {
		// For each item found, get the band and title
		children := tr.Children()

		name := trim(0, children)
		if len(name) == 0 {
			log.Fatal("card name not found")
		}

		rarity := 0
		if rarity, err := strconv.ParseUint(trim(2, children), 10, 32); err != nil {
			log.Fatalf("card rarity parse error: %s, %d", name, rarity)
		}

		ctype := trim(3, children)
		energy := trim(4, children)
		desc := trim(5, children)

		img, exist := children.Eq(1).Find("img").First().Attr("data-src")
		if exist == false {
			img, _ = children.Eq(1).Find("img").First().Attr("src")
		}

		fmt.Printf("%s: Rarity - %s | Type - %s | Energy - %s | Desc - %s | Image - %s \n", name, rarity, ctype, energy, desc, img)
	})
}

// Card data instance
type Card struct {
	Name        string
	URL         string
	Rarity      uint
	Energy      uint
	Description string
}
