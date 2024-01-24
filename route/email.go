package route

import (
	"database/sql"
	"errors"
	"net/http"
	"os"
	"regexp"
	"strings"
	"time"

	_ "github.com/mattn/go-sqlite3"
)

var db *sql.DB

func init() {
	var err error

	db, err = sql.Open("sqlite3", filePath())
	if err != nil {
		panic(err)
	}

	if err = db.Ping(); err != nil {
		panic(err)
	}

	const initialize string = `
	CREATE TABLE IF NOT EXISTS newsletter (
	  id INTEGER NOT NULL PRIMARY KEY,
	  email TEXT UNIQUE NOT NULL,
	  joined INTEGER NOT NULL,
	  verified BOOLEAN DEFAULT FALSE
	);

	PRAGMA journal_mode = wal;
	`

	if _, err := db.Exec(initialize); err != nil {
		panic(err)
	}
}

func filePath() (path string) {
	const defaultPath string = "database.db"

	path = os.Getenv("DATABASE")
	if path == "" {
		path = defaultPath
	}
	return
}

func saveEmail(email string) (err error) {
	email = strings.ToLower(email)

	const validEmailPattern string = `^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}`
	valid, _ := regexp.MatchString(validEmailPattern, email)

	if !valid {
		return errors.New("email is not valid")
	}

	const signup string = "INSERT INTO newsletter (email, joined) VALUES (?, ?)"

	currentTime := time.Now().Unix()

	_, err = db.Exec(signup, email, currentTime)
	return
}

func Signup(w http.ResponseWriter, r *http.Request) {
	email := r.FormValue("email")

	err := saveEmail(email)
	if err == nil {
		// TODO send verification email
		emailResponseHTML(w, r)
		return
	}

	switch err.Error() {
	case "UNIQUE constraint failed: newsletter.email":
		// TODO resend verification email instead
		emailResponseHTML(w, r)
		return
	default:
		InternalServerError(w, r)
		return
	}
}

func emailResponseHTML(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "text/html")
	http.ServeFile(w, r, "src/email.html")
}
