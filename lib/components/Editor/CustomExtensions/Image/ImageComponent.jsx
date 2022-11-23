import React from "react";

import { NodeViewWrapper } from "@tiptap/react";
import { Resizable } from "re-resizable";

const ImageComponent = ({ node, editor, getPos }) => {
  const { alt, src, figheight, figwidth } = node.attrs;
  const caption = alt || "";
  const { view } = editor;
  let height = figheight;
  let width = figwidth;

  return (
    <NodeViewWrapper>
      <figure>
        <Resizable
          lockAspectRatio
          className="neeto-editor__image"
          size={{ height, width }}
          onResizeStop={(_event, _direction, ref) => {
            height = ref.offsetHeight;
            width = ref.offsetWidth;
            view.dispatch(
              view.state.tr.setNodeMarkup(getPos(), undefined, {
                ...node.attrs,
                figheight: height,
                figwidth: width,
                height,
                width,
              })
            );
            editor.commands.focus();
          }}
        >
          <img {...node.attrs} alt={caption} src={src} />
        </Resizable>
        <figcaption>{caption}</figcaption>
      </figure>
    </NodeViewWrapper>
  );
};

export default ImageComponent;
