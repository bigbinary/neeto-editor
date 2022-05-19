import { EDITOR_CONTENT_CLASSNAME } from "constants/common";

import hljs from "highlight.js/lib/common";

export default function highlightCode() {
  document
    .querySelectorAll(`div.${EDITOR_CONTENT_CLASSNAME} pre code`)
    .forEach(el => {
      hljs.highlightElement(el);
    });
}
