import { EDITOR_CONTENT_CLASSNAME } from "constants/common";

import hljs from "highlight.js/lib/common";

document
  .querySelectorAll(`div.${EDITOR_CONTENT_CLASSNAME} pre code`)
  .forEach(element => hljs.highlightElement(element));
