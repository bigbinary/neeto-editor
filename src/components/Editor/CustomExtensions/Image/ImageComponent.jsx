import React, { useRef } from "react";

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
  const figureRef = useRef(null);

  const { alt, src, figheight, figwidth, align } = node.attrs;
  const { view } = editor;
  let height = figheight;
  let width = figwidth;
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
        {src ? (
          <Resizable
            lockAspectRatio
            className="neeto-editor__image"
            size={{ height, width }}
            onResizeStop={(_event, _direction, ref) => {
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
            }}
          >
            <img {...node.attrs} alt={caption} src={src} />
          </Resizable>
        ) : (
          <div className="neeto-editor__image-placeholder">
            <Spinner />
          </div>
        )}
        <NodeViewContent
          as="figcaption"
          className={classNames({ "is-empty": isEmpty(caption) })}
          style={{ width: `${width}px` }}
        />
      </figure>
    </NodeViewWrapper>
  );
};

export default ImageComponent;
