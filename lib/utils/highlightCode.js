import React from "react";

import { lowlight } from "lowlight";
import { renderToString } from "react-dom/server";

import { CODE_BLOCK_REGEX } from "constants/common";

const buildReactElementFromAST = element => {
  if (element.tagName) {
    const children = element.children
      ? element.children.map(buildReactElementFromAST)
      : null;
    return React.createElement(element.tagName, element.properties, children);
  }

  return element.value;
};

const highlightCode = content =>
  content.replaceAll(CODE_BLOCK_REGEX, (_, code) => {
    const highlightedAST = lowlight.highlightAuto(
      code
        .replaceAll("&gt;", ">")
        .replaceAll("&lt;", "<")
        .replaceAll("&amp;", "&")
    );
    const highlightedNode = highlightedAST.children.map(
      buildReactElementFromAST
    );
    return `<pre><code>${renderToString(highlightedNode)}</code></pre>`;
  });

export default highlightCode;
