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

const ImageMenu = ({ align, updateAttributes }) => {
  const menuOptions = buildImageOptions();

  return (
    <Dropdown
      buttonSize="small"
      className="neeto-editor__image-menu"
      icon={MenuHorizontal}
      position="top"
      buttonProps={{
        className: "neeto-editor__image-menu-btn",
      }}
    >
      {menuOptions.map(({ Icon, optionName, alignPos }) => (
        <MenuButton
          icon={Icon}
          iconActive={alignPos === align}
          key={optionName}
          tooltipProps={{
            content: humanize(optionName),
            position: "bottom",
            delay: [500],
          }}
          onClick={() => updateAttributes({ align: alignPos })}
        />
      ))}
      <Menu />
    </Dropdown>
  );
};

const ImageComponent = ({ node, editor, getPos, updateAttributes }) => {
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
        <ImageMenu align={align} updateAttributes={updateAttributes} />
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
          className={classNames({ "is-empty": isEmpty(caption) })}
        />
      </figure>
    </NodeViewWrapper>
  );
};

export default ImageComponent;
