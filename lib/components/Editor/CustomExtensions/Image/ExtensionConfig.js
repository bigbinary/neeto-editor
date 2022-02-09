import Image from "@tiptap/extension-image";
import { mergeAttributes } from "@tiptap/core";

export default Image.extend({
  name: "image",

  addAttributes() {
    return {
      ...Image.config.addAttributes(),
      size: {
        default: "small",
        rendered: false,
      },
      float: {
        default: "none",
        rendered: false,
      },
    };
  },

  addCommands() {
    return {
      setImage:
        (options) =>
        ({ tr, commands }) => {
          if (tr.selection?.node?.type?.name == "image") {
            return commands.updateAttributes("image", options);
          } else {
            return commands.insertContent({
              type: this.name,
              attrs: options,
            });
          }
        },
    };
  },

  renderHTML({ node, HTMLAttributes }) {
    const { src, alt } = HTMLAttributes;

    HTMLAttributes.class = " image-" + node.attrs.size;
    HTMLAttributes.class += " image-float-" + node.attrs.float;
    delete HTMLAttributes.src;
    delete HTMLAttributes.alt;

    return [
      "figure",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      ["img", { src }],
      ["figcaption", alt || ""],
    ];
  },
});
