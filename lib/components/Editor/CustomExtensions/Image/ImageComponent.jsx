import React from "react";

import { NodeViewWrapper } from "@tiptap/react";
import { Resizable } from "re-resizable";

const ImageComponent = ({ node }) => {
  const { alt, src, float, align } = node.attrs;
  const caption = alt || "";

  return (
    <NodeViewWrapper>
      <Resizable
        lockAspectRatio
        className={`neeto-editor__image neeto-editor__image--${float} neeto-editor__image--${align}`}
        defaultSize={{ height: "auto", width: 384 }}
      >
        <figure>
          <img alt={caption} src={src} />
          <figcaption>{caption}</figcaption>
        </figure>
      </Resizable>
    </NodeViewWrapper>
  );
};

export default ImageComponent;
