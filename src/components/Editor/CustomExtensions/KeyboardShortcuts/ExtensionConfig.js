import { Extension } from "@tiptap/core";
import { liftTarget } from "@tiptap/pm/transform";

const KeyboardShortcuts = ({ onSubmit, shortcuts, isBlockQuoteActive }) =>
  Extension.create({
    name: "keyboard-shortcuts",

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
        // To fix the issue with backspace on the empty list item moving the focus to the block on top.
        // https://github.com/ueberdosis/tiptap/issues/2829#issuecomment-1511064298
        Backspace: () =>
          this.editor.commands.command(({ tr }) => {
            const { selection, doc } = tr;
            const { $cursor } = selection;
            const depth = $cursor?.depth;

            if (
              $cursor &&
              depth >= 3 && // At least the structure is doc -> orderedList/bulletList -> listItem -> paragraph
              $cursor.parent.type.name === "paragraph" && // The cursor is inside a paragraph.
              $cursor.parentOffset === 0 && // The cursor is at the beginning of the paragraph.
              $cursor.node(depth - 1).type.name === "listItem" && // The paragraph is inside a listItem.
              $cursor.index(depth - 1) === 0 && // The paragraph is at the beginning of the listItem.
              $cursor.index(depth - 2) === 0 // The listItem is at the beginning of the list.
            ) {
              const listItemNode = $cursor.node(depth - 1);
              const listItemPos = $cursor.before(depth - 1);
              const $contentBegin = doc.resolve(listItemPos + 1);
              const $contentEnd = doc.resolve(
                listItemPos + listItemNode.nodeSize - 1
              );
              const range = $contentBegin.blockRange($contentEnd);
              const target = liftTarget(range);
              if (target !== null) {
                tr.lift(range, target);

                return true;
              }
            }

            return false;
          }),
        ...shortcuts,
      };
    },
  });

export default {
  configure: ({ onSubmit, shortcuts, isBlockQuoteActive }) =>
    KeyboardShortcuts({ onSubmit, shortcuts, isBlockQuoteActive }),
};
