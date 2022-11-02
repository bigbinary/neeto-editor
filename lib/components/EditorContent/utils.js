import React from "react";

import { lowlight } from "lowlight";
import { renderToString } from "react-dom/server";

import { CODE_BLOCK_REGEX } from "./constants";

const buildReactElementFromAST = element => {
  if (element.tagName) {
    const children = element.children
      ? element.children.map(buildReactElementFromAST)
      : null;
    return React.createElement(element.tagName, element.properties, children);
  }

  return element.value;
};

export const highlightCode = content =>
  content.replace(CODE_BLOCK_REGEX, (_, code) => {
    const highlightedAST = lowlight.highlightAuto(
      code.replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&amp;/g, "&")
    );
    const highlightedNode = highlightedAST.children.map(
      buildReactElementFromAST
    );
    return `<pre><code>${renderToString(highlightedNode)}</code></pre>`;
  });
