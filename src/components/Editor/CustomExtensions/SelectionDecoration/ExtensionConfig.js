import Document from "@tiptap/extension-document";
import { Plugin, PluginKey } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";

export default Document.extend({
  name: "selectionDecorator",
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("selectionDecorator"),
        state: {
          init() {
            return DecorationSet.empty;
          },
          apply(tr) {
            const { doc, selection } = tr;
            const decorations = [];
            if (selection.empty) {
              return DecorationSet.empty;
            }

            decorations.push(
              Decoration.inline(selection.from, selection.to, {
                class: "selected-text",
              })
            );

            return DecorationSet.create(doc, decorations);
          },
        },
        props: {
          decorations(state) {
            return this.getState(state);
          },
        },
      }),
    ];
  },
});
