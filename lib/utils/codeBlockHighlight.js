import hljs from "highlight.js/lib/common";

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll("pre code")
    .forEach(element => hljs.highlightElement(element));
});
