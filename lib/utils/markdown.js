import DOMPurify from "dompurify";
import { marked } from "marked";
import TurndownService from "turndown";

export const markdownToHtml = (data) => {
  const parsedHTML = marked.parse(data);

  // Strip off <p> tags from images.
  const result = parsedHTML
    .replaceAll(/<p>(?=<img)/g, "")
    .replaceAll(/(?<=<img[^>]*\/>)<\/p>/g, "");

  return result;
};

export const htmlToMarkdown = (data) => {
  const turndownService = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
  });

  // Adding strike through rule: ~strike~
  turndownService.addRule("strikethrough", {
    filter: ["del", "s", "strike"],
    replacement: (content) => `~${content}~`,
  });

  // Adding highlight rule: ==text==
  turndownService.addRule("highlight", {
    filter: ["mark"],
    replacement: (content) => `==${content}==`,
  });

  return DOMPurify.sanitize(turndownService.turndown(data));
};
