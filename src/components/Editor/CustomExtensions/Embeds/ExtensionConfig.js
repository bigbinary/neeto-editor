import { Node, mergeAttributes, PasteRule } from "@tiptap/core";
import { TextSelection } from "prosemirror-state";

import { COMBINED_REGEX } from "common/constants";

import { validateUrl } from "./utils";

export default Node.create({
  name: "external-video",

  addOptions() {
    return {
      inline: false,
      HTMLAttributes: {},
    };
  },

  inline() {
    return this.options.inline;
  },

  group() {
    return this.options.inline ? "inline" : "block";
  },

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      title: {
        default: null,
      },
      frameborder: {
        default: "0",
      },
      allow: {
        default:
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
      },
      allowfullscreen: {
        default: "allowfullscreen",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "iframe[src]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "iframe",
      mergeAttributes(this.options.HTMLAttributes, {
        ...HTMLAttributes,
        class: "video-wrapper",
      }),
    ];
  },

  addCommands() {
    return {
      setExternalVideo:
        options =>
        ({ commands }) =>
          commands.insertContent({
            type: this.name,
            attrs: options,
          }),
    };
  },

  addPasteRules() {
    return [
      new PasteRule({
        find: COMBINED_REGEX,
        handler: ({ state, range, match }) => {
          state.tr.delete(range.from, range.to);
          state.tr.setSelection(
            TextSelection.create(state.doc, range.from + 1)
          );

          const validatedUrl = validateUrl(match[0]);
          if (validatedUrl) {
            const node = state.schema.nodes["external-video"].create({
              src: validatedUrl,
            });
            state.tr.insert(range.from, node);
            const nextPos = state.tr.selection.$to.pos;
            const emptyParagraph = state.schema.nodes.paragraph.create();
            state.tr.insert(nextPos, emptyParagraph);
            state.tr.setSelection(TextSelection.create(state.tr.doc, nextPos));
          }
        },
      }),
    ];
  },
});
