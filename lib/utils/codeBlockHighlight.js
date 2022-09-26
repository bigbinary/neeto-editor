import hljs from "highlight.js/lib/common";

document
  .querySelectorAll("pre code")
  .forEach(element => hljs.highlightElement(element));
