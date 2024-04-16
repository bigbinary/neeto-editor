import { Extension } from "@tiptap/core";
import { PluginKey } from "prosemirror-state";

export default Extension.create({
  name: "paste-unformatted",
  key: new PluginKey("paste-unformatted"),

  addCommands() {
    return {
      pasteUnformatted:
        () =>
        async ({ editor }) => {
          const text = await navigator.clipboard.readText();
          editor.commands.insertContent(text);
        },
    };
  },
});
