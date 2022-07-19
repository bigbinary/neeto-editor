import React from "react";

import { NodeViewWrapper } from "@tiptap/react";
import { Resizable } from "re-resizable";

const ImageComponent = ({ node }) => {
  const { alt, src } = node.attrs;
  const caption = alt || "";
  const imageClass = "";

  return (
    <NodeViewWrapper>
      <Resizable lockAspectRatio className="neeto-editor__image">
        <figure>
          <img alt={caption} src={src} className={imageClass} />
          <figcaption>{caption}</figcaption>
        </figure>
      </Resizable>
    </NodeViewWrapper>
  );
};

export default ImageComponent;
