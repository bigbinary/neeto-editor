import { Extension } from "@tiptap/core";

const KeyboardShortcuts = ({ handleSubmit }) =>
  Extension.create({
    addKeyboardShortcuts() {
      return {
        "Mod-Enter": () => {
          handleSubmit?.(this.editor.getHTML());
          this.editor.commands.blur();
          return true;
        },
      };
    },
  });

export default {
  configure: ({ handleSubmit }) => KeyboardShortcuts({ handleSubmit }),
};
