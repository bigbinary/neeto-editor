/* eslint-disable @bigbinary/neeto/file-name-and-export-name-standards */
import hljs from "highlight.js/lib/common";

const highlightLinesScriptCDNPath =
  "//cdn.jsdelivr.net/gh/TRSasasusu/highlightjs-highlight-lines.js@1.2.0/highlightjs-highlight-lines.min.js";

function applyLineHighlighting(codeElement) {
  hljs.highlightElement(codeElement);
  const preElement = codeElement.closest("pre");

  const highlightedLines = preElement.getAttribute("data-highlighted-lines");
  if (highlightedLines) {
    const linesToHighlight = highlightedLines.split(",").map(Number);
    const highlightLinesOptions = linesToHighlight.map(line => ({
      start: line,
      end: line,
      color: "rgba(255, 255, 0, 0.2)",
    }));
    hljs.highlightLinesElement(codeElement, highlightLinesOptions);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const script = document.createElement("script");
  script.src = highlightLinesScriptCDNPath;
  script.async = true;
  document.head.appendChild(script);
  script.addEventListener("load", () => {
    document.querySelectorAll("pre code").forEach(applyLineHighlighting);
  });
});
