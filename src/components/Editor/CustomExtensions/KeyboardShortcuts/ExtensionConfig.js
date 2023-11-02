import { Extension } from "@tiptap/core";

const KeyboardShortcuts = ({ onSubmit, shortcuts }) =>
  Extension.create({
    name: "keyboard-shortcuts",

    addKeyboardShortcuts() {
      return {
        "Mod-Enter": () => {
          onSubmit?.(this.editor.getHTML());

          return true;
        },
        ...shortcuts,
      };
    },
  });

export default {
  configure: ({ onSubmit, shortcuts }) =>
    KeyboardShortcuts({ onSubmit, shortcuts }),
};
