export const generateKeyboardShortcuts = (editor, shortcuts) => {
  return shortcuts.reduce(
    (keyboardShortcuts, shortcut) => ({
      ...keyboardShortcuts,
      [shortcut.key]: () => {
        shortcut.handler?.(editor.getHTML(), editor);
        return true;
      },
    }),
    {}
  );
};
