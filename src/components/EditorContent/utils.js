import { createElement } from "react";

import hljs from "highlight.js/lib/common";
import { lowlight } from "lowlight";
import { findBy } from "neetocist";
import { isEmpty } from "ramda";
import { renderToString } from "react-dom/server";

import {
  CODE_BLOCK_REGEX,
  LANGUAGE_LIST,
  VARIABLE_SPAN_REGEX,
} from "./constants";

const buildLinkSVG = () => {
  const svgNS = "http://www.w3.org/2000/svg";

  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("height", "20");
  svg.setAttribute("viewBox", "0 0 16 16");
  svg.setAttribute("width", "20");

  const path = document.createElementNS(svgNS, "path");
  path.setAttribute(
    "d",
    "M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
  );

  svg.appendChild(path);

  return svg;
};

const convertTextToId = text =>
  text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-");

const transformCode = code =>
  code.replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&amp;/g, "&");

const buildReactElementFromAST = element => {
  if (element.tagName) {
    const children = element.children
      ? element.children.map(buildReactElementFromAST)
      : null;

    return createElement(element.tagName, element.properties, children);
  }

  return element.value;
};

const highlightLinesCode = (code, options) => {
  code.innerHTML = code.innerHTML.replace(
    /([ \S]*\n|[ \S]*$)/gm,
    match => `<div class="highlight-line">${match}</div>`
  );

  if (options === undefined) {
    return;
  }

  const paddingLeft = parseInt(window.getComputedStyle(code).paddingLeft);
  const paddingRight = parseInt(window.getComputedStyle(code).paddingRight);

  const lines = code.getElementsByClassName("highlight-line");
  const scroll_width = code.scrollWidth;
  // eslint-disable-next-line @bigbinary/neeto/use-array-methods
  for (const option of options) {
    for (let j = option.start; j <= option.end; ++j) {
      lines[j].style.backgroundColor = option.color;
      lines[j].style.minWidth = `${
        scroll_width - paddingLeft - paddingRight
      }px`;
    }
  }
};

export const highlightLinesElement = (code, options) => {
  // eslint-disable-next-line @bigbinary/neeto/use-array-methods
  for (const option of options) {
    --option.start;
    --option.end;
  }
  highlightLinesCode(code, options);
};

export const applySyntaxHighlighting = content => {
  lowlight.highlightAuto("");
  let highlightedAST = {};

  return content.replace(CODE_BLOCK_REGEX, (_, language, code) => {
    const regex = /data-highlighted-lines="([^"]*)"/;
    const match = content.match(regex);

    if (language && LANGUAGE_LIST.includes(language)) {
      highlightedAST = lowlight.highlight(language, transformCode(code));
    } else {
      highlightedAST = hljs.highlightAuto(transformCode(code))._emitter.root;
      if (isEmpty(highlightedAST.children)) {
        highlightedAST = lowlight.highlight("javascript", transformCode(code));
      }
    }

    const highlightedNode = highlightedAST.children.map(
      buildReactElementFromAST
    );

    return `<pre data-highlighted-lines=${
      match?.[1] ?? ""
    }><code>${renderToString(highlightedNode)}</code></pre>`;
  });
};

export const applyLineHighlighting = editorContent => {
  const codeTags = editorContent?.querySelectorAll("pre code");

  codeTags.forEach(codeTag => {
    const highlightedLines = codeTag
      .closest("pre")
      .getAttribute("data-highlighted-lines");
    if (highlightedLines) {
      const linesToHighlight = highlightedLines
        .split(",")
        ?.filter(Boolean)
        .map(Number);

      const highlightLinesOptions = linesToHighlight.map(line => ({
        start: line,
        end: line,
        color: "rgba(255, 255, 0, 0.2)",
      }));

      highlightLinesElement(codeTag, highlightLinesOptions);
    }
  });
};

export const substituteVariables = (highlightedContent, variables) =>
  highlightedContent.replace(VARIABLE_SPAN_REGEX, (matchedSpan, dataLabel) => {
    const dataLabelSplitted = dataLabel.split(".");
    if (dataLabelSplitted.length > 1) {
      const category = findBy({ category: dataLabelSplitted[0] }, variables);
      const variable = findBy(
        { key: dataLabelSplitted[1] },
        category?.variables || []
      );

      return variable?.value ? variable.value : matchedSpan;
    }

    const variable = findBy({ key: dataLabelSplitted[0] }, variables);

    return variable?.value ? variable.value : matchedSpan;
  });

export const makeHeadingsNavigable = editorContentNode => {
  const headerTags = editorContentNode.querySelectorAll(
    "h1, h2, h3, h4, h5, h6"
  );

  headerTags.forEach(heading => {
    const headingId = convertTextToId(heading.textContent);
    heading.setAttribute("id", headingId); // Add id to heading for anchor linking

    const anchor = document.createElement("a");
    anchor.setAttribute("href", `#${headingId}`);
    anchor.classList.add("header-wrapper-link");
    anchor.appendChild(buildLinkSVG());
    anchor.appendChild(heading.cloneNode(true));

    heading.replaceWith(anchor);
  });
};
