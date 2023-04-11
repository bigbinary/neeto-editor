import React from "react";

import { MenuHorizontal } from "neetoicons";
import { Button, Dropdown } from "neetoui";

import { buildImageOptions } from "../../MediaUploader/utils";

const Menu = ({ align, updateAttributes, deleteNode }) => {
  const menuOptions = buildImageOptions();

  const handleClick = align =>
    align ? updateAttributes({ align }) : deleteNode();

  return (
    <Dropdown
      buttonSize="small"
      buttonStyle="secondary"
      icon={MenuHorizontal}
      position="top"
    >
      {menuOptions.map(({ Icon, optionName, alignPos }) => (
        <Button
          icon={Icon}
          key={optionName}
          style={alignPos === align ? "secondary" : "text"}
          tooltipProps={{ content: optionName, position: "top" }}
          onClick={() => handleClick(alignPos)}
        />
      ))}
    </Dropdown>
  );
};

export default Menu;
