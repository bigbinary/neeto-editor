import { DirectUpload } from "@rails/activestorage";
import Image from "@tiptap/extension-image";
import { mergeAttributes, ReactNodeViewRenderer } from "@tiptap/react";
import { Plugin } from "prosemirror-state";

import ImageComponent from "./ImageComponent";

const ImageExtension = Image.extend({
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

const upload = (file, url) =>
  new Promise((resolve, reject) => {
    const uploader = new DirectUpload(file, url);

    uploader.create((error, { blob_url: imageUrl }) => {
      if (error) return reject(error);

      return resolve(imageUrl);
    });
  });

export default {
  configure: ({ uploadEndpoint }) =>
    ImageExtension.extend({
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
                      src: await upload(image, uploadEndpoint),
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
    }),
};
