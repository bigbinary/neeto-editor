import React, { useRef } from "react";

import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import classNames from "classnames";
import { isEmpty } from "lodash";
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
      {menuOptions.map(({ Icon, active, optionName, align }) => (
        <MenuButton
          icon={Icon}
          iconActive={active}
          key={optionName}
          tooltipProps={{
            content: humanize(optionName),
            position: "bottom",
            delay: [500],
          }}
          onClick={() => editor.commands.updateAttributes("image", { align })}
        />
      ))}
      <Menu />
    </Dropdown>
  );
};

const ImageComponent = ({ node, editor, getPos }) => {
  const figureRef = useRef(null);
  const { alt, src, figheight, figwidth, align } = node.attrs;
  const { view } = editor;
  let height = figheight;
  let width = figwidth;
  const caption =
    figureRef.current?.querySelector("figcaption>div")?.textContent;

  return (
    <NodeViewWrapper
      className={`neeto-editor__image-wrapper neeto-editor__image--${align}`}
    >
      <figure ref={figureRef}>
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
          <img {...node.attrs} alt={alt} src={src} />
        </Resizable>
        <NodeViewContent
          as="figcaption"
          className={classNames({ "is-empty": isEmpty(caption) })}
        />
      </figure>
    </NodeViewWrapper>
  );
};

export default ImageComponent;
