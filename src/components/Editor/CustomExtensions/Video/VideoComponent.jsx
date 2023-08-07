import React, { useRef, useState } from "react";

import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import classNames from "classnames";
import { isEmpty, mergeRight } from "ramda";
import { Resizable } from "re-resizable";

import Menu from "../Image/Menu";

const VideoComponent = ({
  node,
  editor,
  getPos,
  updateAttributes,
  deleteNode,
}) => {
  const { alt, src, vidheight, vidwidth, align } = node.attrs;

  const [captionWidth, setCaptionWidth] = useState(vidwidth || 0);

  const figureRef = useRef(null);

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
          editor={editor}
          updateAttributes={updateAttributes}
        />
        <Resizable
          lockAspectRatio
          className="neeto-editor__image"
          size={{ height, width }}
          onResize={(_event, _direction, ref) =>
            setCaptionWidth(ref.offsetWidth)
          }
          onResizeStop={(_event, _direction, ref) => {
            height = ref.offsetHeight;
            width = ref.offsetWidth;
            view.dispatch(
              view.state.tr.setNodeMarkup(
                getPos(),
                undefined,
                mergeRight(node.attrs, {
                  vidheight: height,
                  vidwidth: width,
                  height,
                  width,
                })
              )
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
          style={{ width: `${captionWidth}px` }}
        />
      </figure>
    </NodeViewWrapper>
  );
};

export default VideoComponent;
