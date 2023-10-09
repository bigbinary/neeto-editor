import React, { useRef, useState } from "react";

import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import classNames from "classnames";
import { Spinner } from "neetoui";
import { isEmpty, mergeRight } from "ramda";
import { Resizable } from "re-resizable";

import Menu from "./Menu";

const ImageComponent = ({
  node,
  editor,
  getPos,
  updateAttributes,
  deleteNode,
}) => {
  const { alt, src, figheight, figwidth, align } = node.attrs;

  const [captionWidth, setCaptionWidth] = useState(figwidth || 0);

  const figureRef = useRef(null);

  const { view } = editor;
  let height = figheight;
  let width = figwidth;
  const caption = figureRef.current
    ? figureRef.current.querySelector("figcaption>div")?.textContent
    : alt;

  const handleResizeStop = (_event, _direction, ref) => {
    height = ref.offsetHeight;
    width = ref.offsetWidth;
    view.dispatch(
      view.state.tr.setNodeMarkup(
        getPos(),
        undefined,
        mergeRight(node.attrs, {
          figheight: height,
          figwidth: width,
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
      data-cy="neeto-editor-image-wrapper"
    >
      <figure ref={figureRef}>
        <Menu {...{ align, deleteNode, editor, updateAttributes }} />
        {src ? (
          <Resizable
            lockAspectRatio
            className="neeto-editor__image"
            size={{ height, width }}
            onResizeStop={handleResizeStop}
            onResize={(_event, _direction, ref) =>
              setCaptionWidth(ref.offsetWidth)
            }
          >
            <img {...node.attrs} alt={caption} {...{ src }} />
          </Resizable>
        ) : (
          <div className="neeto-editor__image-placeholder">
            <Spinner />
          </div>
        )}
        <NodeViewContent
          as="figcaption"
          className={classNames({ "is-empty": isEmpty(caption) })}
          style={{ width: `${captionWidth}px` }}
        />
      </figure>
    </NodeViewWrapper>
  );
};

export default ImageComponent;
