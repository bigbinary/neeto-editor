import { buildHeaderLinks } from "./utils/headers";

document.addEventListener("DOMContentLoaded", () => {
  const editorContent = document.querySelector(".neeto-editor-content");

  if (editorContent) buildHeaderLinks(editorContent);
});
