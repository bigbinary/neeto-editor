import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import CalloutComponent from "./CalloutComponent";

export default Node.create({
  name: "callout",

  inline: false,

  group: "block",

  content: "block+",

  defining: true,

  draggable: true,

  addAttributes() {
    return {
      type: {
        default: "default",
        parseHTML: element => element.getAttribute("data-type") || "default",
        renderHTML: attributes => ({ "data-type": attributes.type }),
      },
      emoji: {
        default: "💡",
        parseHTML: element => element.getAttribute("data-emoji") || "💡",
        renderHTML: attributes => ({
          "data-emoji": attributes.emoji,
        }),
      },
    };
  },

  parseHTML() {
    return [{ tag: "div[data-type]", contentElement: ".callout-content" }];
  },

  renderHTML({ HTMLAttributes, node }) {
    const { type, emoji } = node.attrs;

    return [
      "div",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: `neeto-editor__callout neeto-editor__callout--${type}`,
        "data-type": type,
        "data-emoji": emoji,
      }),
      [
        "div",
        { class: "callout-container" },
        ["span", { class: "callout-emoji" }, emoji],
        ["div", { class: "callout-content" }, 0],
      ],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(CalloutComponent);
  },

  addCommands() {
    return {
      setCallout:
        (attributes = {}) =>
        ({ chain }) => {
          const { type = "default", emoji = "💡" } = attributes;

          return chain()
            .toggleWrap(this.name, { type, emoji })
            .command(({ tr, state, dispatch }) => {
              const { selection } = state;
              const { $from } = selection;

              const calloutNode = $from.node($from.depth - 1);

              if (calloutNode?.type.name === "callout") {
                const pos = $from.after($from.depth - 1);
                const nextNode = state.doc.nodeAt(pos);

                if (!nextNode || nextNode.type.name !== "paragraph") {
                  tr.insert(pos, state.schema.nodes.paragraph.create());
                }
              }

              if (dispatch) {
                dispatch(tr);
              }

              return true;
            })
            .focus()
            .run();
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      Backspace: () => {
        const { state, commands } = this.editor;
        const { $from, empty } = state.selection;

        if (!empty) return false;

        if ($from.parentOffset === 0) {
          const currentNode = $from.parent;

          if (currentNode.content.size === 0) {
            return commands.lift(this.name);
          }

          const calloutNode = $from.node($from.depth - 1);
          if (calloutNode?.type.name === "callout") {
            return commands.lift(this.name);
          }
        }

        return false;
      },
      ArrowDown: () => {
        const { state, commands } = this.editor;
        const { $from, empty } = state.selection;

        if (!empty) return false;

        const currentNode = $from.parent;
        const calloutNode = $from.node($from.depth - 1);

        if (calloutNode?.type.name === "callout") {
          const isAtEnd = $from.parentOffset === currentNode.content.size;

          const calloutContent = calloutNode.content;
          const currentNodeIndex = $from.index($from.depth - 1);
          const isLastNode = currentNodeIndex === calloutContent.childCount - 1;

          if (isAtEnd && isLastNode) {
            const pos = $from.after($from.depth - 1);

            if (pos < state.doc.content.size) {
              const nextNode = state.doc.nodeAt(pos);
              if (nextNode) {
                const endPos = pos + nextNode.nodeSize - 1;

                return commands.setTextSelection(endPos);
              }

              return commands.setTextSelection(pos);
            }

            return (
              commands.insertContentAt(pos, { type: "paragraph" }) &&
              commands.setTextSelection(pos + 1)
            );
          }
        }

        return false;
      },
    };
  },
});
