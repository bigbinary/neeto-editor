import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { lowlight } from "lowlight";
import { PluginKey } from "prosemirror-state";

import CodeBlockComponent from "./CodeBlockComponent";

export default CodeBlockLowlight.extend({
  name: "custom-code-block",

  key: new PluginKey("custom-code-block"),

  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockComponent);
  },
}).configure({ lowlight });
