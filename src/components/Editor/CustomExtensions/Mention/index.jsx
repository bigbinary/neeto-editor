import React from "react";

import { Email } from "neetoicons";
import { Avatar, Dropdown, Typography } from "neetoui";
import { isEmpty } from "ramda";

const { Menu, MenuItem } = Dropdown;

const Mentions = ({
  editor,
  mentions,
  tooltipContent,
  isSecondaryMenu = false,
  label,
}) => {
  if (isEmpty(mentions)) return null;

  return (
    <Dropdown
      buttonStyle="text"
      data-cy="neeto-editor-mention-option"
      icon={Email}
      strategy="fixed"
      buttonProps={{
        tooltipProps: { content: tooltipContent ?? label, position: "bottom" },
        className: "neeto-editor-fixed-menu__item",
      }}
      customTarget={
        isSecondaryMenu && (
          <MenuItem.Button>
            <Email /> {label}
          </MenuItem.Button>
        )
      }
      onClick={e => isSecondaryMenu && e.stopPropagation()}
    >
      <Menu>
        {mentions.map(({ key, name, imageUrl }) => (
          <MenuItem.Button
            data-cy={`neeto-editor-mention-option-${key}`}
            key={key}
            onClick={() => editor.commands.setMention({ id: key, label: name })}
          >
            <Avatar size="small" user={{ name, imageUrl }} />
            <Typography style="body2">{name}</Typography>
          </MenuItem.Button>
        ))}
      </Menu>
    </Dropdown>
  );
};

export default Mentions;
