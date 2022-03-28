import { Extension } from "@tiptap/core";
import { isNilOrEmpty } from "utils/common";
import { generateKeyboardShortcuts } from "./helpers";

const KeyboardShortcuts = (shortcuts) => {
  if (isNilOrEmpty(shortcuts)) return;

  return Extension.create({
    addKeyboardShortcuts() {
      return generateKeyboardShortcuts.call(this, shortcuts);
    },
  });
};

export default {
  configure: (shortcuts) => KeyboardShortcuts(shortcuts),
};
