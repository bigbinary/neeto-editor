import { Extension } from "@tiptap/core";

const KeyboardShortcuts = ({
  onSubmit,
  shortcuts,
  setIsEmojiPickerActive,
  handleUploadAttachments,
}) =>
  Extension.create({
    name: "keyboard-shortcuts",

    addKeyboardShortcuts() {
      return {
        "Mod-Enter": () => {
          onSubmit?.(this.editor.getHTML());
          this.editor.commands.blur();

          return true;
        },
        "Mod-Alt-e": () => {
          setIsEmojiPickerActive?.(prevState => !prevState);

          return true;
        },
        "Mod-Alt-a": () => {
          handleUploadAttachments?.();

          return true;
        },
        ...shortcuts,
      };
    },
  });

export default {
  configure: ({
    onSubmit,
    shortcuts,
    setIsEmojiPickerActive,
    handleUploadAttachments,
  }) =>
    KeyboardShortcuts({
      onSubmit,
      shortcuts,
      setIsEmojiPickerActive,
      handleUploadAttachments,
    }),
};
