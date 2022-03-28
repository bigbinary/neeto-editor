export function generateKeyboardShortcuts(shortcuts) {
  return shortcuts.reduce(
    (keyboardShortcuts, shortcut) => ({
      ...keyboardShortcuts,
      [shortcut.key]: () => {
        shortcut.handler?.(this.editor.getHTML(), this.editor);
        return true;
      },
    }),
    {}
  );
}
