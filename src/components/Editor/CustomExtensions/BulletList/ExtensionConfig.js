import BulletList from "@tiptap/extension-bullet-list";

export default BulletList.extend({
  addKeyboardShortcuts() {
    return {
      // This will handle the backspace press in both bulletList and orderedList.
      Backspace: () =>
        this.editor.commands.command(({ state, tr, dispatch }) => {
          const { $from, empty } = state.selection;
          const inList =
            this.editor.isActive("bulletList") ||
            this.editor.isActive("orderedList");

          if (empty && inList && $from.parent.type.name === "paragraph") {
            const isTrailingParagraph = $from.parent.content.size === 0;

            const $list = $from.node($from.depth - 2);
            const $listItem = $from.node($from.depth - 1);

            const isInListItem = $listItem.type.name === "listItem";
            const isLastParagraphInListItem =
              $from.index($from.depth - 1) === $listItem.childCount - 1;

            // Check for list items above and below
            const currentItemIndex = $from.index($from.depth - 2);
            const hasListItemsAbove = currentItemIndex > 0;
            const hasListItemsBelow = currentItemIndex < $list.childCount - 1;

            if (
              isTrailingParagraph &&
              isInListItem &&
              isLastParagraphInListItem &&
              !hasListItemsBelow &&
              hasListItemsAbove
            ) {
              if (dispatch) {
                const range = $from.blockRange($from);
                if (range) {
                  tr.lift(range, 0);
                  dispatch(tr);
                }
              }

              return true;
            }
          }

          return false;
        }),
    };
  },
});
