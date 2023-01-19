import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { assoc } from "ramda";

import VideoComponent from "./VideoComponent";

const VideoExtension = Node.create({
  name: "video",

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
        parseHTML: element =>
          element.querySelector("video")?.getAttribute("src"),
      },

      alt: {
        default: "",
        parseHTML: element =>
          element.querySelector("video")?.getAttribute("alt"),
      },

      vidheight: {
        default: 288,
        parseHTML: element =>
          element.querySelector("video")?.getAttribute("vidheight"),
      },

      vidwidth: {
        default: "fit-content",
        parseHTML: element =>
          element.querySelector("video")?.getAttribute("vidwidth"),
      },

      align: {
        default: "left",
        parseHTML: element =>
          element.querySelector("video")?.getAttribute("align"),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "figure[data-video]",
        getAttrs: node => node.style.fontWeight !== "normal" && null,
        contentElement: "figcaption",
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const { align, src, vidheight, vidwidth } = node.attrs;

    const linkAttrs = {
      href: src,
      target: "_blank",
      rel: "noopener noreferrer",
      class: `neeto-editor__image-wrapper neeto-editor__image--${align}`,
    };

    const resizeAttrs = {
      class: "neeto-editor__image",
      style: `height:${vidheight}px;width:${vidwidth}px;`,
    };

    return [
      "a",
      linkAttrs,
      [
        "figure",
        mergeAttributes(this.options.HTMLAttributes, { "data-video": "" }),
        [
          "div",
          resizeAttrs,
          [
            "video",
            mergeAttributes(HTMLAttributes, {
              preload: "metadata",
              controls: true,
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
    return ReactNodeViewRenderer(VideoComponent);
  },

  addCommands() {
    return {
      setVideo:
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

export default {
  configure: ({ setMediaUploader }) =>
    VideoExtension.extend({
      addKeyboardShortcuts() {
        return {
          "Mod-Alt-v": () => setMediaUploader(assoc("video", true)),
        };
      },
    }),
};
