import { Extension } from "@tiptap/core";
import { t } from "i18next";
import { Plugin } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";

const Placeholder = Extension.create({
  name: "placeholder",

  addOptions() {
    return {
      excludeNodeTypes: ["variable", "codeBlock"],
      emptyEditorClass: "is-editor-empty",
      emptyNodeClass: "is-empty",
      placeholder: t("neetoEditor.placeholders.writeSomething"),
      showOnlyWhenEditable: true,
      showOnlyCurrent: false,
      includeChildren: false,
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          decorations: ({ doc, selection }) => {
            const active =
              this.editor.isEditable || !this.options.showOnlyWhenEditable;
            const { anchor } = selection;
            const decorations = [];

            if (!active) {
              return null;
            }

            doc.descendants((node, pos) => {
              const hasAnchor = anchor >= pos && anchor <= pos + node.nodeSize;
              const isEmpty = !node.isLeaf && !node.childCount;

              const isExcluded = this.options.excludeNodeTypes.includes(
                node.type.name
              );

              if (
                (hasAnchor || !this.options.showOnlyCurrent) &&
                !isExcluded &&
                isEmpty
              ) {
                const classes = [this.options.emptyNodeClass];

                if (this.editor.isEmpty) {
                  classes.push(this.options.emptyEditorClass);
                }

                const decoration = Decoration.node(pos, pos + node.nodeSize, {
                  class: classes.join(" "),
                  "data-placeholder": this.options.placeholder,
                });
                decorations.push(decoration);
              }

              return this.options.includeChildren;
            });

            return DecorationSet.create(doc, decorations);
          },
        },
      }),
    ];
  },
});

export default Placeholder;
