import { Extension } from "@tiptap/core";
import { PluginKey } from "prosemirror-state";

const KeyboardShortcuts = ({ onSubmit, shortcuts, isBlockQuoteActive }) =>
  Extension.create({
    name: "keyboard-shortcuts",
    key: new PluginKey("keyboard-shortcuts"),

    addKeyboardShortcuts() {
      return {
        "Mod-Enter": () => {
          onSubmit?.(this.editor.getHTML());

          return true;
        },
        "Mod-Shift-b": () => {
          if (isBlockQuoteActive) {
            this.editor.chain().focus().toggleBlockquote().run();

            return true;
          }

          return false;
        },
        ...shortcuts,
      };
    },
  });

export default {
  configure: ({ onSubmit, shortcuts, isBlockQuoteActive }) =>
    KeyboardShortcuts({ onSubmit, shortcuts, isBlockQuoteActive }),
};
