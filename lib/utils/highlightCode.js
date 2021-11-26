import hljs from "highlight.js/lib/common";

export default function highlightCode() {
  document.querySelectorAll("div.tiptap-content pre code").forEach((el) => {
    hljs.highlightElement(el);
  });
}
