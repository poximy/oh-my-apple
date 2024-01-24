package main

import (
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/poximy/ohmyapple/route"
)

func main() {
	s := NewServer()
	s.MountMiddleware()
	s.MountHandlers()
	s.MountErrorPageHandlers()

	err := http.ListenAndServe(":"+Port(), s.Router)
	if err != nil {
		panic(err)
	}
}

type Server struct {
	Router *chi.Mux
}

func NewServer() *Server {
	s := &Server{}
	s.Router = chi.NewRouter()
	return s
}

func (s *Server) MountMiddleware() {
	s.Router.Use(middleware.Logger)
	s.Router.Use(middleware.Compress(5, "text/html", "text/css"))
}

func (s *Server) MountHandlers() {
	s.Router.Get("/", route.Index)
	s.Router.Post("/signup", route.Signup)

	fileServer := http.FileServer(http.Dir("public/"))
	s.Router.Handle("/public/*", http.StripPrefix("/public", fileServer))
}

func (s *Server) MountErrorPageHandlers() {
	s.Router.NotFound(route.NotFound)
	s.Router.MethodNotAllowed(route.MethodNotAllowed)
}

func Port() (port string) {
	const defaultPort string = "8080"

	port = os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}
	return
}
