import { mergeAttributes, Node } from "@tiptap/core";
import { Plugin } from "@tiptap/pm/state";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { t } from "i18next";
import { globalProps } from "neetocommons/initializers";
import { Toastr } from "neetoui";
import { isEmpty } from "ramda";

import { DIRECT_UPLOAD_ENDPOINT } from "src/common/constants";
import DirectUpload from "utils/DirectUpload";

import { LARGE_IMAGE_ERROR } from "./constants";
import ImageComponent from "./ImageComponent";

const upload = async (file, url) => {
  if (file.size <= globalProps.endUserUploadedFileSizeLimitInMb * 1024 * 1024) {
    const uploader = new DirectUpload({ file, url });
    const response = await uploader.create();

    return response.data?.blob_url || response.blob_url;
  }

  throw new Error(LARGE_IMAGE_ERROR);
};

export default Node.create({
  name: "image",

  addOptions() {
    return { HTMLAttributes: {}, openImageInNewTab: true };
  },

  group: "block",

  content: "inline*",

  draggable: false,

  isolating: true,

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: element => element.getAttribute("id"),
      },

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
    return [{ tag: "figure" }];
  },

  renderHTML({ node, HTMLAttributes }) {
    const { align, src, figheight, figwidth } = node.attrs;

    if (!src) return ["span"];

    const openImageInNewTab = this.options.openImageInNewTab;

    const wrapperDivAttrs = {
      class: `neeto-editor__image-wrapper neeto-editor__image--${align}`,
    };

    const wrapperLinkPointerEventsStyle = openImageInNewTab
      ? ""
      : "pointer-events:none;";

    const heightStyle = figheight === "auto" ? "auto" : `${figheight}px`;
    const wrapperLinkAttrs = {
      href: src,
      target: "_blank",
      rel: "noopener noreferrer",
      class: "neeto-editor__image",
      style: `height:${heightStyle};width:${figwidth}px;display:inline-block;${wrapperLinkPointerEventsStyle}`,
    };

    const captionAttrs = { style: `width:${figwidth}px;` };

    return [
      "div",
      wrapperDivAttrs,
      [
        "figure",
        this.options.HTMLAttributes,
        [
          "a",
          wrapperLinkAttrs,
          [
            "img",
            mergeAttributes(HTMLAttributes, {
              draggable: false,
              contenteditable: false,
            }),
          ],
        ],
        ["figcaption", captionAttrs, 0],
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
            .run(),
    };
  },

  addKeyboardShortcuts() {
    return {
      Enter: () => {
        const head = this.editor.state.selection.$head;

        if (head.node().type.name === "image") {
          this.editor
            .chain()
            .insertContentAt(head.after(), {
              type: "paragraph",
              content: "",
            })
            .focus()
            .run();

          return true;
        }

        // Fallback to TipTap's default behavior
        return false;
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

              // Microsoft Excel and a few other products might copy content as
              // both `text/plain` and `text/html`. If `text/plain` exists,
              // an early return will ensure that it fallbacks to tiptap's
              // default paste behavior.
              const text = event?.clipboardData?.getData("text/plain");
              if (text) return;

              const hasFiles = event.clipboardData?.files?.length;

              if (!hasFiles) return;

              const images = Array.from(event.clipboardData.files).filter(
                file => /image/i.test(file.type)
              );

              if (isEmpty(images)) return;

              event.preventDefault();

              let currentPos = pos;

              images.forEach(async image => {
                let emptyImageNode;
                try {
                  const id = Math.random().toString(36).substring(7);
                  emptyImageNode = schema.nodes.image.create({
                    id,
                    src: "",
                    alt: t("neetoEditor.attachments.uploading"),
                  });

                  const tr = view.state.tr
                    .insert(currentPos, emptyImageNode)
                    .setMeta("addToHistory", false);
                  view.dispatch(tr);

                  const url = await upload(image, DIRECT_UPLOAD_ENDPOINT);
                  if (url) {
                    const updateTr = view.state.tr.setNodeMarkup(
                      currentPos + 1,
                      null,
                      { id, src: url, alt: "" }
                    );
                    view.dispatch(updateTr);

                    currentPos += emptyImageNode.nodeSize;
                  }
                } catch (error) {
                  // eslint-disable-next-line no-console
                  console.error("Failed to insert the image", error);
                  const tr = view.state.tr
                    .delete(currentPos, currentPos + emptyImageNode.nodeSize)
                    .setMeta("addToHistory", false);
                  view.dispatch(tr);

                  if (error.message === LARGE_IMAGE_ERROR) {
                    Toastr.error(
                      t("neetoEditor.error.imageSizeIsShouldBeLess", {
                        limit: globalProps.endUserUploadedFileSizeLimitInMb,
                      })
                    );
                  } else {
                    Toastr.error(t("neetoEditor.error.imageUploadFailed"));
                  }
                }
              });
            },
          },
        },
      }),
    ];
  },
});
