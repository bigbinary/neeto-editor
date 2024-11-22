/* eslint-disable @bigbinary/neeto/file-name-and-export-name-standards */
import hljs from "highlight.js/lib/common";

const highlightLinesScriptCDNPath =
  "//cdn.jsdelivr.net/gh/TRSasasusu/highlightjs-highlight-lines.js@1.2.0/highlightjs-highlight-lines.min.js";

const copyToClipboard = text => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text);
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = text;

      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.position = "fixed";

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

const addCopyToClipboardButton = codeElement => {
  const copyButton = document.createElement("button");
  copyButton.setAttribute(
    "class",
    "text-primary-grey absolute right-3 top-3 text-xs copy-button"
  );
  copyButton.innerText = "Copy";

  copyButton.addEventListener("click", () => {
    copyToClipboard(codeElement.innerText);
    copyButton.innerText = "Copied";
    setTimeout(() => {
      copyButton.innerText = "Copy";
    }, 2500);
  });

  codeElement.parentNode.appendChild(copyButton);
};

function applyCodeblockDecorations(codeElement) {
  hljs.highlightElement(codeElement);
  addCopyToClipboardButton(codeElement);
  const preElement = codeElement.closest("pre");

  const highlightedLines = preElement.getAttribute("data-highlighted-lines");
  const linesToHighlight = highlightedLines?.split(",")?.map(Number) ?? [0];
  const highlightLinesOptions = linesToHighlight
    .filter(line => line > 0)
    .map(line => ({
      start: line,
      end: line,
      color: "rgba(255, 255, 0, 0.2)",
    }));
  hljs.highlightLinesElement(codeElement, highlightLinesOptions);
}

document.addEventListener("DOMContentLoaded", () => {
  const script = document.createElement("script");
  script.src = highlightLinesScriptCDNPath;
  script.async = true;
  document.head.appendChild(script);
  script.addEventListener("load", () => {
    document.querySelectorAll("pre code").forEach(applyCodeblockDecorations);
  });
});
