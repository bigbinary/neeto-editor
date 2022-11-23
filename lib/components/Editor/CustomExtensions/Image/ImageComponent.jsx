import React from "react";

import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { MenuHorizontal } from "neetoicons";
import { Resizable } from "re-resizable";

import Dropdown from "components/Common/Dropdown";
import MenuButton from "components/Common/MenuButton";
import { humanize } from "utils/common";

import { buildImageOptions } from "./utils";

const { Menu } = Dropdown;

const ImageMenu = ({ editor }) => {
  const menuOptions = buildImageOptions(editor);

  return (
    <Dropdown
      buttonSize="small"
      className="neeto-editor__image-menu"
      icon={MenuHorizontal}
      position="top"
      trigger="hover"
      buttonProps={{
        className: "neeto-editor__image-menu-btn",
      }}
    >
      {menuOptions.map(({ Icon, active, optionName, command }) => (
        <MenuButton
          icon={Icon}
          iconActive={active}
          key={optionName}
          tooltipProps={{
            content: humanize(optionName),
            position: "bottom",
            delay: [500],
          }}
          onClick={command}
        />
      ))}
      <Menu />
    </Dropdown>
  );
};

const ImageComponent = ({ node, editor, getPos }) => {
  const { alt, src, figheight, figwidth, align } = node.attrs;
  const caption = alt || "";
  const { view } = editor;
  let height = figheight;
  let width = figwidth;

  return (
    <NodeViewWrapper
      className={`neeto-editor__image-wrapper neeto-editor__image--${align}`}
    >
      <figure>
        <ImageMenu editor={editor} />
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
        <NodeViewContent
          as="figcaption"
          className="neeto-editor__image-caption"
        />
      </figure>
    </NodeViewWrapper>
  );
};

export default ImageComponent;
