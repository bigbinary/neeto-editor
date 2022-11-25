import React from "react";

import { MenuHorizontal } from "neetoicons";

import Dropdown from "components/Common/Dropdown";
import MenuButton from "components/Common/MenuButton";
import { humanize } from "utils/common";

import { buildImageOptions } from "./utils";

const Menu = ({ align, updateAttributes, deleteNode }) => {
  const menuOptions = buildImageOptions();

  const handleClick = align =>
    align ? updateAttributes({ align }) : deleteNode();

  return (
    <Dropdown
      buttonSize="small"
      buttonStyle="secondary"
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
          onClick={() => handleClick(alignPos)}
        />
      ))}
    </Dropdown>
  );
};

export default Menu;
