import { mergeAttributes, Node, nodeInputRule } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { Plugin } from "prosemirror-state";
import { isEmpty } from "ramda";

import DirectUpload from "utils/DirectUpload";

import ImageComponent from "./ImageComponent";

const inputRegex = /!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/;

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
        default: null,
        parseHTML: element => element.querySelector("img")?.getAttribute("alt"),
      },

      figheight: {
        default: 288,
        parseHTML: element =>
          element.querySelector("img")?.getAttribute("figheight"),
      },

      figwidth: {
        default: "fit-content",
        parseHTML: element =>
          element.querySelector("img")?.getAttribute("figwidth"),
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

  renderHTML({ HTMLAttributes }) {
    return [
      "figure",
      this.options.HTMLAttributes,
      [
        "img",
        mergeAttributes(HTMLAttributes, {
          draggable: false,
          contenteditable: false,
        }),
      ],
      ["figcaption", 0],
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
              const position = doc.resolve(selection.to - 1).end();

              return commands.setTextSelection(position);
            })
            .run(),
    };
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: inputRegex,
        type: this.type,
        getAttributes: match => {
          const [, src, alt] = match;

          return { src, alt };
        },
      }),
    ];
  },
});

const upload = async (file, url) => {
  const uploader = new DirectUpload({ file, url });
  const { blob_url: imageUrl } = await uploader.create();

  return imageUrl;
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
