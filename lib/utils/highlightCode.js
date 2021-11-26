import hljs from "highlight.js/lib/common";
import { EDITOR_CONTENT_CLASSNAME } from "constants/common";

export default function highlightCode() {
  document
    .querySelectorAll(`div.${EDITOR_CONTENT_CLASSNAME} pre code`)
    .forEach((el) => {
      hljs.highlightElement(el);
    });
}
