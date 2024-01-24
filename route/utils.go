package route

import (
	"html/template"
	"net/http"
	"os"
)

func fileLoader(filePath string) []byte {
	b, err := os.ReadFile(filePath)
	if err != nil {
		panic("unable to load file: " + filePath)
	}

	return b
}

func loadTemplate(name string, data []byte) *template.Template {
	html := string(data)

	tmplt := template.New(name)
	tmplt, err := tmplt.Parse(html)

	if err != nil {
		panic("unable to parse html")
	}

	return tmplt
}

func htmlResponse(filePath string) func(http.ResponseWriter, *http.Request) {
	b := fileLoader(filePath)

	return func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusCreated)
		w.Header().Set("Content-Type", "text/html")

		w.Write(b)
	}
}
