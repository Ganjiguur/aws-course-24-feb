package main

import (
	"fmt"
	"net/http"
	"os"
	"strconv"
)

var counter int = 0

func main() {
	http.HandleFunc("/", index_handler)
	http.HandleFunc("/about", about_handler)
	http.HandleFunc("/crash", crash_handler)
	fmt.Println("Serving 80...")
	http.ListenAndServe(":80", nil)
}

func index_handler(w http.ResponseWriter, r *http.Request) {
	hostname, _ := os.Hostname()
	fmt.Fprintf(w, "Hello world,, This is index \n")
	fmt.Fprintf(w, "Container ID: %s", hostname)
}

func about_handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "This is about page")
}

func crash_handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, strconv.Itoa(counter))
	counter = counter + 1
	if counter > 20 {
		defer fmt.Println("!")
		os.Exit(3)
	}
}
