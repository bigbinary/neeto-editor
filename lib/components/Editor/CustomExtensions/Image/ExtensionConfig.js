import Image from "@tiptap/extension-image";
import { mergeAttributes, ReactNodeViewRenderer } from "@tiptap/react";

import ImageComponent from "./ImageComponent";

export default Image.extend({
  name: "image",

  addAttributes() {
    return {
      ...Image.config.addAttributes(),
      height: {
        default: "auto",
        rendered: false,
      },
      width: {
        default: "fit-content",
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
        options =>
        ({ tr, commands }) => {
          if (tr.selection?.node?.type?.name === "image") {
            return commands.updateAttributes("image", options);
          }

          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },

      setImageAttributes:
        attributes =>
        ({ tr }) => {
          const { selection } = tr;
          const options = {
            ...selection.node.attrs,
            ...attributes,
          };

          const node = this.type.create(options);
          tr.replaceRangeWith(selection.from, selection.to, node);
        },
    };
  },

  parseHTML() {
    return [
      {
        tag: "img",
      },
    ];
  },

  renderHTML({ node }) {
    const { alt, src, float, align, height, width } = node.attrs;
    const caption = alt || "";
    const heightStyle = isNaN(height) ? height : `${height}px`;
    const widthStyle = isNaN(width) ? width : `${width}px`;
    const wrapperStyles = `height:${heightStyle};width:${widthStyle};`;
    const wrapperClass = `neeto-editor__image neeto-editor__image--${float} neeto-editor__image--${align} neeto-editor__image-defaults`;

    return [
      "a",
      {
        class: wrapperClass,
        style: wrapperStyles,
        href: src,
        target: "_blank",
        rel: "noopener noreferrer",
      },
      [
        "figure",
        {},
        ["img", mergeAttributes(node.attrs, { src, caption })],
        ["figcaption", caption],
      ],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageComponent);
  },
});
