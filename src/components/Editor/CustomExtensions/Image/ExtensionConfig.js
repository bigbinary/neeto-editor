import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { Toastr } from "neetoui";
import { Plugin } from "prosemirror-state";
import { isEmpty } from "ramda";

import DirectUpload from "utils/DirectUpload";

import ImageComponent from "./ImageComponent";

import { MAX_IMAGE_SIZE } from "../../MediaUploader/constants";

const ImageExtension = Node.create({
  name: "image",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  group: "block",

  content: "inline*",

  draggable: true,

  isolating: true,

  addAttributes() {
    return {
      src: {
        default: null,
        parseHTML: element => element.querySelector("img")?.getAttribute("src"),
      },

      alt: {
        default: "",
        parseHTML: element => element.querySelector("img")?.getAttribute("alt"),
      },

      figheight: {
        default: "auto",
        parseHTML: element =>
          element.querySelector("img")?.getAttribute("figheight"),
      },

      figwidth: {
        default: 400,
        parseHTML: element =>
          element.querySelector("img")?.getAttribute("figwidth"),
      },

      align: {
        default: "left",
        parseHTML: element =>
          element.querySelector("img")?.getAttribute("align"),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "figure",
        contentElement: "figcaption",
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const { align, src, figheight, figwidth } = node.attrs;

    const linkAttrs = {
      href: src,
      target: "_blank",
      rel: "noopener noreferrer",
      class: `neeto-editor__image-wrapper neeto-editor__image--${align}`,
    };

    const resizeAttrs = {
      class: "neeto-editor__image",
      style: `height:${figheight}px;width:${figwidth}px;`,
    };

    return [
      "a",
      linkAttrs,
      [
        "figure",
        this.options.HTMLAttributes,
        [
          "div",
          resizeAttrs,
          [
            "img",
            mergeAttributes(HTMLAttributes, {
              draggable: false,
              contenteditable: false,
            }),
          ],
        ],
        ["figcaption", 0],
      ],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageComponent);
  },

  addCommands() {
    return {
      setFigure:
        ({ caption, ...attrs }) =>
        ({ chain }) =>
          chain()
            .insertContent({
              type: this.name,
              attrs,
              content: caption ? [{ type: "text", text: caption }] : [],
            })
            // set cursor at end of caption field
            .command(({ tr, commands }) => {
              const { doc, selection } = tr;
              const position = doc.resolve(selection.to).end();

              return commands.setTextSelection(position);
            })
            .run(),
    };
  },
});

const upload = async (file, url) => {
  if (file.size <= MAX_IMAGE_SIZE) {
    const uploader = new DirectUpload({ file, url });
    const response = await uploader.create();

    return response.data?.blob_url || response.blob_url;
  }

  const imageSizeInMB = MAX_IMAGE_SIZE / (1024 * 1024);
  Toastr.error(`Image size should be less than ${imageSizeInMB} MB`);

  return "";
};

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

                  if (isEmpty(images)) return;

                  event.preventDefault();

                  images.forEach(async image => {
                    const node = schema.nodes.image.create({
                      src: await upload(image, uploadEndpoint),
                    });
                    if (node.attrs.src) {
                      const transaction = view.state.tr.insert(pos, node);
                      view.dispatch(transaction);
                    }
                  });
                },
              },
            },
          }),
        ];
      },
    }),
};
