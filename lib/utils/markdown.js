import DOMPurify from "dompurify";
import { marked } from "marked";
import TurndownService from "turndown";

export const markdownToHtml = (data) => {
  let parsedHTML = marked.parse(data);

  // Strip off <p> tags from <img> tags.
  parsedHTML = parsedHTML.replace(/<p><img[^>]*><\/p>/g, (match) =>
    match.replace(/<\/?p>/g, "")
  );

  // Convert ==text== to <mark>text</mark>
  parsedHTML = parsedHTML.replaceAll(/==([^=]+)==/g, "<mark>$1</mark>");

  return parsedHTML;
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
