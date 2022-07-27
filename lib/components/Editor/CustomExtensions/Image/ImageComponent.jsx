import React from "react";

import { NodeViewWrapper } from "@tiptap/react";
import { Resizable } from "re-resizable";

const ImageComponent = ({ node, editor, getPos }) => {
  const { alt, src, float, align, height, width } = node.attrs;
  const caption = alt || "";
  const { view } = editor;

  return (
    <NodeViewWrapper>
      <Resizable
        lockAspectRatio
        className={`neeto-editor__image neeto-editor__image--${float} neeto-editor__image--${align} neeto-editor__image-defaults`}
        size={{ height, width }}
        onResizeStop={(e, direction, ref) => {
          view.dispatch(
            view.state.tr.setNodeMarkup(getPos(), undefined, {
              ...node.attrs,
              height: ref.offsetHeight,
              width: ref.offsetWidth,
            })
          );
          editor.commands.focus();
        }}
      >
        <figure>
          <img alt={caption} src={src} {...node.attrs} />
          <figcaption>{caption}</figcaption>
        </figure>
      </Resizable>
    </NodeViewWrapper>
  );
};

export default ImageComponent;
