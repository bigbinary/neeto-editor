import { Node, mergeAttributes } from "@tiptap/core";

const Variable = Node.create({
  name: "variable",

  defaultOptions: {
    HTMLAttributes: { class: "variable__text" },
    charOpen: "{{",
    charClose: "}}",
    renderLabel({ options, node }) {
      return `${options.charOpen}${node.attrs.label || node.attrs.id}${
        options.charClose
      }`;
    },
  },

  group: "inline",

  inline: true,

  selectable: false,

  content: "text*",

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-id"),
        renderHTML: (attributes) => {
          if (!attributes.id) {
            return {};
          }

          return {
            "data-id": attributes.id,
          };
        },
      },

      label: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-label"),
        renderHTML: (attributes) => {
          if (!attributes.label) {
            return {};
          }

          return {
            "data-label": attributes.label,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[data-variable]",
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(
        { "data-variable": "" },
        this.options.HTMLAttributes,
        HTMLAttributes
      ),
      this.options.renderLabel({
        options: this.options,
        node,
      }),
    ];
  },

  renderText({ node }) {
    return this.options.renderLabel({
      options: this.options,
      node,
    });
  },

  addCommands() {
    return {
      setVariable:
        (attributes) =>
        ({ chain, state, editor }) => {
          const { selection } = state;
          const range = { from: selection.$anchor.pos };

          chain()
            .focus()
            .insertContent([
              {
                type: this.name,
                attrs: attributes,
              },
            ])
            .run();
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      Backspace: () =>
        this.editor.commands.command(({ tr, state }) => {
          let isVariable = false;
          const { selection } = state;
          const { empty, anchor } = selection;

          if (!empty) {
            return false;
          }

          state.doc.nodesBetween(anchor - 1, anchor, (node, pos) => {
            if (node.type.name === this.name) {
              isVariable = true;
              tr.insertText("", pos, pos + node.nodeSize);

              return false;
            }
          });

          return isVariable;
        }),
    };
  },
});

export default Variable;
