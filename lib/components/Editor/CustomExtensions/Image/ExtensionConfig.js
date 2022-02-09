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
      align: {
        default: "center",
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

      setImageFloatLeft:
        () =>
        ({ tr, commands }) => {
          if (tr.selection?.node?.type?.name == "image") {
            return commands.updateAttributes("image", {
              class: "image-float-left image-size-small",
            });
          }
        },

      setImageFloatRight:
        () =>
        ({ tr, commands }) => {
          if (tr.selection?.node?.type?.name == "image") {
            return commands.updateAttributes("image", {
              class: "image-float-right image-size-small",
            });
          }
        },

      setImageCenter:
        () =>
        ({ tr, commands }) => {
          if (tr.selection?.node?.type?.name == "image") {
            return commands.updateAttributes("image", {
              class: "image-float-none image-align-center image-size-small",
            });
          }
        },

      setImageBanner:
        () =>
        ({ tr, commands }) => {
          if (tr.selection?.node?.type?.name == "image") {
            return commands.updateAttributes("image", {
              class: "image-float-none image-align-center image-size-large",
            });
          }
        },
    };
  },

  renderHTML({ node, HTMLAttributes }) {
    const { src, alt } = HTMLAttributes;

    HTMLAttributes.class = " image-size-" + node.attrs.size;
    HTMLAttributes.class += " image-float-" + node.attrs.float;
    HTMLAttributes.class += " image-align-" + node.attrs.align;
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
