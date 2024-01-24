package route

import (
	"errors"
	"html/template"
	"io"
	"net/http"
	"strings"
	"sync"
	"time"

	"github.com/anaskhan96/soup"
)

var tmplt *template.Template
var data []website

func init() {
	wg := sync.WaitGroup{}
	wg.Add(2)

	go func() {
		const filePath string = "./src/index.gohtml"
		html := fileLoader(filePath)
		tmplt = loadTemplate("index", html)
		wg.Done()
	}()
	go func() {
		data = scrape()
		if len(data) != len(websites) {
			panic("Cound not scrape data!")
		}

		wg.Done()
	}()

	wg.Wait()
	go refresh()
}

func Index(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html")
	err := tmplt.Execute(w, data)
	if err != nil {
		InternalServerError(w, r)
		return
	}
}

func refresh() {
	const delay time.Duration = 5 * time.Minute

	for {
		time.Sleep(delay)

		// TODO Update seperately in case of error
		if s := scrape(); len(s) == len(websites) {
			data = s
			continue
		}
	}
}

var websites = [3]string{"macrumors", "appleinsider", "9to5mac"}

type website struct {
	Name   string
	Rumors []rumor
}

type rumor struct {
	Title string
	Href  string
}

func scrape() (data []website) {
	wg := sync.WaitGroup{}

	for _, site := range websites {
		wg.Add(1)
		go func(site string) {
			defer wg.Done()

			a := obtainRumors(site)
			if len(a) == 0 {
				return
			}

			w := website{site, a}
			data = append(data, w)
		}(site)
	}

	wg.Wait()
	return
}

func obtainRumors(website string) (rumors []rumor) {
	url := buildURL(website)
	html, err := obtainHTML(url)

	if err != nil {
		return
	}

	headerTags := extractHeaderTags(html, "h2")
	anchorTags := extractAnchorTags(headerTags)

	for _, tag := range anchorTags {
		title := tag.Text()
		href := tag.Attrs()["href"]

		rumors = append(rumors, rumor{title, href})
	}
	return
}

func buildURL(domain string) (url string) {
	var sb strings.Builder

	sb.WriteString("https://")
	sb.WriteString(domain)
	sb.WriteString(".com")

	url = sb.String()
	return
}

func obtainHTML(url string) (string, error) {
	resp, err := http.Get(url)
	if err != nil {
		return "", errors.New("error getting HTML")
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", errors.New("error reading HTML")
	}

	defer resp.Body.Close()
	return string(body), nil
}

func extractHeaderTags(html, findTag string) []soup.Root {
	htmlSoup := soup.HTMLParse(html)
	return htmlSoup.FindAll(findTag)
}

func extractAnchorTags(tags []soup.Root) (anchorTags []soup.Root) {
	const maximum int = 16
	anchorTags = make([]soup.Root, 0, maximum)

	for i := 0; i < len(tags) && len(anchorTags) < maximum; i++ {
		tag := tags[i].Find("a")
		if tag.Error != nil {
			continue
		}

		anchorTags = append(anchorTags, tag)
	}
	return
}
