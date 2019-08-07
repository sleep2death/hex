package main

import (
	"fmt"
	"log"
	"net/http"
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
	doc.Find(".article-table tr").Each(func(i int, tr *goquery.Selection) {
		// For each item found, get the band and title
		children := tr.Children()

		name := strings.TrimSpace(children.Eq(0).Text())
		img, exist := children.Eq(1).Find("img").First().Attr("data-src")
		if exist == false {
			img, _ = children.Eq(1).Find("img").First().Attr("src")
		}

		rarity := strings.TrimSpace(children.Eq(2).Text())
		ctype := strings.TrimSpace(children.Eq(3).Text())
		energy := strings.TrimSpace(children.Eq(4).Text())
		desc := strings.TrimSpace(children.Eq(5).Text())

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
