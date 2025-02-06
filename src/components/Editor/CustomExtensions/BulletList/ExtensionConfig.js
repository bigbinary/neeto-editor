import BulletList from "@tiptap/extension-bullet-list";

function isListNode(node) {
  return node.type.name === "bulletList" || node.type.name === "orderedList";
}

export default BulletList.extend({
  addKeyboardShortcuts() {
    return {
      Backspace: () =>
        this.editor.commands.command(({ state, commands }) => {
          const { $from, empty } = state.selection;

          if (!empty) return false;

          const node = $from.node();
          if (node.type.name !== "paragraph" || node.content.size !== 0) {
            return false;
          }

          const $listItem = $from.node($from.depth - 1);
          if ($listItem.type.name !== "listItem") {
            return commands.deleteCurrentNode();
          }

          const currentIndex = $from.index($from.depth - 1);

          // lift the block if the the list item is empty.
          if (currentIndex === $listItem.childCount - 1) {
            return commands.liftEmptyBlock();
          }

          const nextNode = $listItem.child(currentIndex + 1);
          if (!isListNode(nextNode)) {
            return commands.deleteCurrentNode();
          }

          if (currentIndex === 0) {
            return commands.joinBackward();
          }

          // Delete the empty paragraph node between the two lists.
          const prevNode = $listItem.child(currentIndex - 1);
          if (isListNode(prevNode)) {
            return commands.deleteCurrentNode();
          }

          // Check if the current node and previous node are compatible for join
          const prevListItem = $from.node($from.depth - 2);
          if (prevListItem && isListNode(prevListItem)) {
            return commands.joinBackward();
          }

          return commands.deleteCurrentNode();
        }),
    };
  },
});
