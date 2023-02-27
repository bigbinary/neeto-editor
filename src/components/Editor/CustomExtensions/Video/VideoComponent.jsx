import React, { useRef } from "react";

import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import classNames from "classnames";
import { isEmpty } from "ramda";
import { Resizable } from "re-resizable";

import Menu from "../Image/Menu";

const VideoComponent = ({
  node,
  editor,
  getPos,
  updateAttributes,
  deleteNode,
}) => {
  const figureRef = useRef(null);

  const { alt, src, vidheight, vidwidth, align } = node.attrs;
  const { view } = editor;
  let height = vidheight;
  let width = vidwidth;
  const caption = figureRef.current
    ? figureRef.current.querySelector("figcaption>div")?.textContent
    : alt;

  return (
    <NodeViewWrapper
      className={`neeto-editor__image-wrapper neeto-editor__image--${align}`}
    >
      <figure ref={figureRef}>
        <Menu
          align={align}
          deleteNode={deleteNode}
          updateAttributes={updateAttributes}
        />
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
                vidheight: height,
                vidwidth: width,
                height,
                width,
              })
            );
            editor.commands.focus();
          }}
        >
          <video
            controls
            {...node.attrs}
            alt={caption}
            preload="metadata"
            src={src}
          />
        </Resizable>
        <NodeViewContent
          as="figcaption"
          className={classNames({ "is-empty": isEmpty(caption) })}
        />
      </figure>
    </NodeViewWrapper>
  );
};

export default VideoComponent;
