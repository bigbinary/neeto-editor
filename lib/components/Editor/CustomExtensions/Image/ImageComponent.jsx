import React from "react";

import { NodeViewWrapper } from "@tiptap/react";
import { Resizable } from "re-resizable";

const ImageComponent = ({ node, editor, getPos }) => {
  const { alt, src, figheight, figwidth } = node.attrs;
  const caption = alt || "";
  const { view } = editor;

  return (
    <NodeViewWrapper>
      <figure>
        <Resizable
          lockAspectRatio
          className="neeto-editor__image"
          size={{ height: figheight, width: figwidth }}
          onResizeStop={(_event, _direction, ref) => {
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
          <img {...node.attrs} alt={caption} src={src} />
        </Resizable>
        <figcaption
          contentEditable="true"
          data-placeholder="this div is actually empty , you can insert content here."
        >
          {caption}
        </figcaption>
      </figure>
    </NodeViewWrapper>
  );
};

export default ImageComponent;
