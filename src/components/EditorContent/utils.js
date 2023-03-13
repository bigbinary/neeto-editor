import React from "react";

import { lowlight } from "lowlight";
import { findBy } from "neetocommons/pure";
import { renderToString } from "react-dom/server";

import { CODE_BLOCK_REGEX, VARIABLE_SPAN_REGEX } from "./constants";

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

export const substituteVariables = (highlightedContent, variables) =>
  highlightedContent.replace(VARIABLE_SPAN_REGEX, (matchedSpan, dataLabel) => {
    const dataLabelSplitted = dataLabel.split(".");
    if (dataLabelSplitted.length > 1) {
      const category = findBy({ category: dataLabelSplitted[0] }, variables);

      const variable = findBy(
        { key: dataLabelSplitted[1] },
        category?.variables
      );

      return variable?.value ? variable.value : matchedSpan;
    }

    const variable = findBy({ key: dataLabelSplitted[0] }, variables);

    return variable?.value ? variable.value : matchedSpan;
  });
