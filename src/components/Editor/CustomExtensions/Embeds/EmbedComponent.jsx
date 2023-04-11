import React from "react";

import { NodeViewWrapper } from "@tiptap/react";
import { Resizable } from "re-resizable";

import Menu from "../Image/Menu";

const EmbedComponent = ({
  node,
  editor,
  getPos,
  updateAttributes,
  deleteNode,
}) => {
  const { figheight, figwidth, align } = node.attrs;
  const { view } = editor;
  let height = figheight;
  let width = figwidth;

  return (
    <NodeViewWrapper
      className={`neeto-editor__video-wrapper neeto-editor__video--${align}`}
    >
      <Resizable
        lockAspectRatio
        className="neeto-editor__video-iframe"
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
        <Menu
          align={align}
          deleteNode={deleteNode}
          updateAttributes={updateAttributes}
        />
        <iframe {...node.attrs} />
      </Resizable>
    </NodeViewWrapper>
  );
};

export default EmbedComponent;
