import hljs from "highlight.js/lib/common";
import "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.2/styles/github.min.css";

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll("pre code")
    .forEach(element => hljs.highlightElement(element));
});
