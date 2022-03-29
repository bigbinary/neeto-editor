import { Extension } from "@tiptap/core";
import { isNilOrEmpty } from "utils/common";
import { generateKeyboardShortcuts } from "./helpers";

const KeyboardShortcuts = ({ handleSubmit, shortcuts }) => {
  if (isNilOrEmpty(shortcuts)) return;

  return Extension.create({
    addKeyboardShortcuts() {
      return {
        "Mod-Enter": () => {
          handleSubmit?.(this.editor.getHTML());
          this.editor.commands.blur();
          return true;
        },
        ...generateKeyboardShortcuts.call(this, shortcuts),
      };
    },
  });
};

export default {
  configure: ({ handleSubmit, shortcuts }) =>
    KeyboardShortcuts({ handleSubmit, shortcuts }),
};
