import { Extension } from "@tiptap/core";
import { PluginKey } from "prosemirror-state";
import Suggestion from "@tiptap/suggestion";

export const CommandsPluginKey = new PluginKey("commands");

export default Extension.create({
  name: "commands",

  defaultOptions: {},

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});
