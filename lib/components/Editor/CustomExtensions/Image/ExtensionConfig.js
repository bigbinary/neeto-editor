import Image from "@tiptap/extension-image";
import { ReactNodeViewRenderer } from "@tiptap/react";

import ImageComponent from "./ImageComponent";

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

  addNodeView() {
    return ReactNodeViewRenderer(ImageComponent);
  },
});
