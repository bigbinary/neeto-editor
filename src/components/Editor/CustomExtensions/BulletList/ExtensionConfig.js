import BulletList from "@tiptap/extension-bullet-list";

export default BulletList.extend({
  addKeyboardShortcuts() {
    return {
      Backspace: () =>
        this.editor.commands.command(({ state, commands }) => {
          const { $from, empty } = state.selection;

          if (empty) {
            const isInParagraph = $from.parent.type.name === "paragraph";
            const isEmptyParagraph = $from.parent.content.size === 0;
            const isInListItem =
              $from.node($from.depth - 1).type.name === "listItem";

            if (isInParagraph && isEmptyParagraph) {
              if (isInListItem) {
                const $listItem = $from.node($from.depth - 1);
                const currentIndex = $from.index($from.depth - 1);

                if (currentIndex === $listItem.childCount - 1) {
                  commands.liftEmptyBlock();

                  return true;
                }

                const nextNode = $listItem.child(currentIndex + 1);

                if (
                  nextNode.type.name === "bulletList" ||
                  nextNode.type.name === "orderedList"
                ) {
                  commands.joinBackward();

                  return true;
                }
              }

              commands.deleteCurrentNode();

              return true;
            }
          }

          return false;
        }),
    };
  },
});
