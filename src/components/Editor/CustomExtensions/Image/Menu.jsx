import { MenuHorizontal } from "neetoicons";
import { Button, Dropdown } from "neetoui";

import { buildImageOptions } from "../../MediaUploader/utils";

const Menu = ({ align, editor, updateAttributes, deleteNode }) => {
  const menuOptions = buildImageOptions();

  const handleClick = align => {
    align ? updateAttributes({ align }) : deleteNode();
    editor.commands.focus();
  };

  return (
    <Dropdown
      buttonProps={{ className: "neeto-editor__image-menu-btn" }}
      buttonSize="large"
      buttonStyle="tertiary"
      className="neeto-editor__image-menu"
      icon={MenuHorizontal}
      position="top"
      strategy="fixed"
    >
      {menuOptions.map(({ Icon, optionName, alignPos }) => (
        <Button
          data-cy={`neeto-editor-image-menu-${optionName}`}
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
