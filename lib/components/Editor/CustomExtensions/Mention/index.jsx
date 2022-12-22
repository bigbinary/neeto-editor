import React from "react";

import { Email } from "neetoicons";
import { Avatar, Dropdown, Typography } from "neetoui";
import { isEmpty } from "ramda";

import { formatMentions } from "./utils";

const Mentions = ({ editor, mentions }) => {
  const formattedMentions = formatMentions(mentions);
  const { Menu, MenuItem } = Dropdown;

  if (isEmpty(formattedMentions)) return null;

  return (
    <Dropdown
      buttonStyle="text"
      data-cy="neeto-editor-mention-option"
      icon={() => <Email size={18} />}
      strategy="fixed"
      buttonProps={{
        tooltipProps: { content: "Mention", position: "bottom" },
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
