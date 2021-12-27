import DOMPurify from "dompurify";
import { marked } from "marked";
import TurndownService from "turndown";

export const markdownToHtml = (data) => {
  // Convert \ to empty <p> tag (blank line)
  data = data.replaceAll(/^\\$/gm, "<p></p>");

  let parsedHTML = marked.parse(data);

  // Remove <p> tag just outside <img> tag
  parsedHTML = parsedHTML.replace(/<p><img[^>]*><\/p>/g, (match) =>
    match.replace(/<\/?p>/g, "")
  );

  // Highlight rule: ==text== => <mark>text</mark>
  parsedHTML = parsedHTML.replaceAll(/==([^=]+)==/g, "<mark>$1</mark>");

  // Convert --text-- to <u>text</u>
  parsedHTML = parsedHTML.replaceAll(/--([^-]+)--/g, "<u>$1</u>");

  return DOMPurify.sanitize(parsedHTML);
};

export const htmlToMarkdown = (data) => {
  const turndownService = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    blankReplacement: (_content, node) => (node.isBlock ? "\\\n" : ""),
  });

  // Strike through rule: ~strike~
  turndownService.addRule("strikethrough", {
    filter: ["del", "s", "strike"],
    replacement: (content) => `~${content}~`,
  });

  // Highlight rule: <mark>text</mark> => ==text==
  turndownService.addRule("highlight", {
    filter: ["mark"],
    replacement: (content) => `==${content}==`,
  });

  // Underline rule: <u>text</u> => --text--
  turndownService.addRule("underline", {
    filter: ["u"],
    replacement: (content) => `--${content}--`,
  });

  return turndownService.turndown(data);
};
