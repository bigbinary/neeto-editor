import React from "react";

import { MenuHorizontal } from "neetoicons";
import { Button, Dropdown } from "neetoui";

import { humanize } from "utils/common";

import { buildImageOptions } from "../../MediaUploader/utils";

const Menu = ({ align, updateAttributes, deleteNode }) => {
  const menuOptions = buildImageOptions();

  const handleClick = align =>
    align ? updateAttributes({ align }) : deleteNode();

  return (
    <Dropdown
      buttonProps={{ className: "neeto-editor__image-menu-btn" }}
      buttonSize="small"
      buttonStyle="secondary"
      className="neeto-editor__image-menu"
      icon={MenuHorizontal}
      position="top"
    >
      {menuOptions.map(({ Icon, optionName, alignPos }) => (
        <Button
          icon={() => <Icon size={18} />}
          key={optionName}
          style={alignPos === align ? "secondary" : "text"}
          tooltipProps={{ content: humanize(optionName), position: "top" }}
          onClick={() => handleClick(alignPos)}
        />
      ))}
    </Dropdown>
  );
};

export default Menu;
