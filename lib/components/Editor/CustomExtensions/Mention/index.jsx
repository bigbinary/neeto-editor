import React from "react";

import { Email } from "neetoicons";
import { Avatar, Dropdown, Typography } from "neetoui";
import { isEmpty } from "ramda";

import { formatMentions } from "./utils";

const Mentions = ({ editor, mentions, tooltips }) => {
  const formattedMentions = formatMentions(mentions);
  const { Menu, MenuItem } = Dropdown;

  if (isEmpty(formattedMentions)) return null;

  return (
    <Dropdown
      buttonStyle="text"
      data-cy="neeto-editor-mention-option"
      icon={Email}
      strategy="fixed"
      buttonProps={{
        tooltipProps: {
          content: tooltips?.mention || "Mention",
          position: "bottom",
        },
        className: "neeto-editor-fixed-menu__item",
      }}
    >
      <Menu>
        {formattedMentions.map(({ key, name, imageUrl }) => (
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
