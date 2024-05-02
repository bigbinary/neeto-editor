import React, { useState } from "react";

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
  const { src, vidheight, vidwidth, align } = node.attrs;

  const [captionWidth, setCaptionWidth] = useState(vidwidth || 0);

  const { view } = editor;
  let height = vidheight;
  let width = vidwidth;
  const caption = node?.content?.content[0]?.text || "";

  const handleResize = (_event, _direction, ref) => {
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
  };

  return (
    <NodeViewWrapper
      className={`neeto-editor__image-wrapper neeto-editor__image--${align}`}
    >
      <figure>
        <Menu {...{ align, deleteNode, editor, updateAttributes }} />
        <Resizable
          lockAspectRatio
          className="neeto-editor__image"
          size={{ height, width }}
          onResizeStop={handleResize}
          onResize={(_event, _direction, ref) =>
            setCaptionWidth(ref.offsetWidth)
          }
        >
          <video
            controls
            {...{ ...node.attrs, src }}
            alt={caption}
            preload="metadata"
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
