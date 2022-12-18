import React, { useRef } from "react";

import { Email } from "neetoicons";
import { Avatar } from "neetoui";
import { isEmpty } from "ramda";

import Dropdown from "components/Common/Dropdown";
import MenuButton from "components/Common/MenuButton";

import { formatMentions } from "./utils";

const Mentions = ({ editor, mentions, menuType = "fixed" }) => {
  const dropdownRef = useRef();
  const formattedMentions = formatMentions(mentions);
  const { Menu, MenuItem } = Dropdown;

  if (isEmpty(formattedMentions)) return null;

  return (
    <Dropdown
      ref={dropdownRef}
      customTarget={() => (
        <MenuButton
          color={menuType === "bubble" && "white"}
          data-cy="neeto-editor-mention-option"
          icon={Email}
          iconActive={dropdownRef?.current?._tippy?.state?.isVisible}
          tooltipProps={{
            content: "Mention",
            position: "bottom",
            delay: [500],
          }}
        />
      )}
    >
      <Menu>
        {formattedMentions.map(({ key, name, imageUrl }) => (
          <MenuItem.Button
            data-cy={`neeto-editor-mention-option-${key}`}
            key={key}
            onClick={() => editor.commands.setMention({ id: key, label: name })}
          >
            <Avatar size="small" user={{ name, imageUrl }} />
            <span>{name}</span>
          </MenuItem.Button>
        ))}
      </Menu>
    </Dropdown>
  );
};

export default Mentions;
