import Image from "@tiptap/extension-image";
import { mergeAttributes, ReactNodeViewRenderer } from "@tiptap/react";
import axios from "axios";
import { Plugin } from "prosemirror-state";

import ImageComponent from "./ImageComponent";

// TODO: https://github.com/bigbinary/neeto-editor-tiptap/issues/308 will create a standardized way to upload images.
const upload = async file => {
  const data = new FormData();
  data.append("blob", file);
  data.append("name", file.name);
  data.append("type", file.type);

  const response = await axios.post(
    "http://spinkart.lvh.me:9005/api/v1/direct_uploads/image_upload",
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return response.imageURL || response.data.imageURL;
};

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

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleDOMEvents: {
            paste(view, event) {
              const {
                schema,
                selection: {
                  $anchor: { pos },
                },
              } = view.state;
              const hasFiles = event.clipboardData?.files?.length;

              if (!hasFiles) return;

              const images = Array.from(event.clipboardData.files).filter(
                file => /image/i.test(file.type)
              );

              if (!images.length) return;

              event.preventDefault();

              images.forEach(async image => {
                const node = schema.nodes.image.create({
                  src: await upload(image),
                });
                const transaction = view.state.tr.insert(pos, node);
                view.dispatch(transaction);
              });
            },
          },
        },
      }),
    ];
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
