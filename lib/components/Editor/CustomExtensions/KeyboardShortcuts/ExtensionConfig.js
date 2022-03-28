import { Extension } from "@tiptap/core";

const KeyboardShortcuts = () =>
  Extension.create({
    addKeyboardShortcuts() {
      return {};
    },
  });

export default {
  configure: () => KeyboardShortcuts(),
};
