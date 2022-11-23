import React from "react";

import { NodeViewWrapper } from "@tiptap/react";
import { MenuHorizontal } from "neetoicons";
import { Resizable } from "re-resizable";

import Dropdown from "components/Common/Dropdown";

const { Menu } = Dropdown;

const ImageMenu = () => (
  <Dropdown
    buttonSize="small"
    icon={MenuHorizontal}
    position="top"
    trigger="hover"
    buttonProps={{
      className: "neeto-editor__image-menu",
    }}
  >
    <Menu />
  </Dropdown>
);

const ImageComponent = ({ node, editor, getPos }) => {
  const { alt, src, figheight, figwidth } = node.attrs;
  const caption = alt || "";
  const { view } = editor;
  let height = figheight;
  let width = figwidth;

  return (
    <NodeViewWrapper>
      <figure>
        <ImageMenu />
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
                figheight: height,
                figwidth: width,
                height,
                width,
              })
            );
            editor.commands.focus();
          }}
        >
          <img {...node.attrs} alt={caption} src={src} />
        </Resizable>
        <figcaption>{caption}</figcaption>
      </figure>
    </NodeViewWrapper>
  );
};

export default ImageComponent;
