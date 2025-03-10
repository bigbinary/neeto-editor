import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { lowlight } from "lowlight";

import CodeBlockComponent from "./CodeBlockComponent";
import { codeBlockHighlightPlugin } from "./plugins";

export default CodeBlockLowlight.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      highlightedLines: {
        default: [],
        parseHTML: element =>
          element.dataset.highlightedLines
            ?.split(",")
            .map(Number)
            .filter(Boolean) || [],
        renderHTML: attributes => ({
          "data-highlighted-lines":
            attributes.highlightedLines?.join(",") ?? "",
        }),
      },
      linenumbers: {
        default: "false",
        parseHTML: element => element.dataset.linenumbers || "false",
        renderHTML: attributes =>
          attributes.linenumbers === "true"
            ? { "data-linenumbers": "true" }
            : {},
      },
    };
  },
  addProseMirrorPlugins() {
    return [...(this.parent?.() || []), codeBlockHighlightPlugin];
  },
  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockComponent);
  },
}).configure({ lowlight, defaultLanguage: "plaintext" });
