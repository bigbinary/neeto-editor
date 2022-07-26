import Image from "@tiptap/extension-image";
import { ReactNodeViewRenderer } from "@tiptap/react";

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
        default: 384,
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

  renderHTML({ node }) {
    const { alt, src, float, align, height, width } = node.attrs;
    const caption = alt || "";
    const wrapperStyles = `height:${height}px;width:${width}px;`;
    const wrapperClass = `neeto-editor__image neeto-editor__image--${float} neeto-editor__image--${align}`;

    return [
      "div",
      { class: wrapperClass, style: wrapperStyles },
      ["figure", {}, ["img", { src, caption }], ["figcaption", caption]],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageComponent);
  },
});
