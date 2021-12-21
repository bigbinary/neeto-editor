import Heading from "@tiptap/extension-heading";
import { mergeAttributes } from "@tiptap/core";

export default Heading.extend({
  name: "title",
  defining: true,

  addAttributes() {
    return {
      level: {
        default: 1,
        rendered: false,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: `h1`,
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      `h1`,
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },
});
