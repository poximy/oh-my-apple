package route

import "net/http"

func NotFound(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html")
	w.WriteHeader(http.StatusNotFound)

	http.ServeFile(w, r, "src/404.html")
}

func MethodNotAllowed(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html")
	w.WriteHeader(http.StatusMethodNotAllowed)

	http.ServeFile(w, r, "src/error.html")
}

func InternalServerError(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html")
	w.WriteHeader(http.StatusInternalServerError)

	http.ServeFile(w, r, "src/error.html")
}
