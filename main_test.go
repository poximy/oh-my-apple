package main

import (
	"net/http"
	"net/http/httptest"
	"os"
	"testing"
)

func executeRequest(req *http.Request, s *Server) *httptest.ResponseRecorder {
	rr := httptest.NewRecorder()
	s.Router.ServeHTTP(rr, req)

	return rr
}

func TestNewServer(t *testing.T) {
	s := NewServer()

	req, _ := http.NewRequest("GET", "/", nil)
	response := executeRequest(req, s)

	if http.StatusNotFound != response.Code {
		t.Errorf("Expected response code %d. Got %d\n", http.StatusNotFound, response.Code)
	}

	s.MountHandlers()
	req, _ = http.NewRequest("GET", "/", nil)
	response = executeRequest(req, s)

	if http.StatusOK != response.Code {
		t.Errorf("Expected response code %d. Got %d\n", http.StatusOK, response.Code)
	}
}

func TestMountHandlers(t *testing.T) {
	s := NewServer()
	s.MountHandlers()

	req, _ := http.NewRequest("GET", "/", nil)
	response := executeRequest(req, s)

	headers := response.Header()

	if amount := len(headers); amount != 1 {
		t.Errorf("Expected 1 header. Got %d\n", amount)
	}

	if headers["Content-Type"][0] != "text/html" {
		t.Errorf("Expected text/html as Content-Type. Got %s\n", headers["Content-Type"][0])
	}
}

func TestPort(t *testing.T) {
	const defaultPort string = "8080"
	if Port() != defaultPort {
		t.Errorf("Expected port of value %s. Got %s\n", defaultPort, Port())
	}

	const definedPort string = "9000"
	os.Setenv("PORT", definedPort)
	if Port() != definedPort {
		t.Errorf("Expected port of value %s. Got %s\n", definedPort, Port())
	}
}
