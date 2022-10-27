import React, { useRef } from "react";

import { Email } from "neetoicons";
import { isEmpty } from "ramda";

import Avatar from "components/Common/Avatar";
import Dropdown from "components/Common/Dropdown";
import MenuButton from "components/Common/MenuButton";

import { formatMentions } from "./utils";

const Mentions = ({
  editor,
  mentions,
  showImageInMention,
  menuType = "fixed",
}) => {
  const dropdownRef = useRef();
  const formattedMentions = formatMentions(mentions, showImageInMention);
  const { Menu, MenuItem } = Dropdown;

  if (isEmpty(formattedMentions)) return null;

  return (
    <Dropdown
      ref={dropdownRef}
      customTarget={() => (
        <MenuButton
          data-cy="neeto-editor-mention-option"
          icon={Email}
          iconActive={dropdownRef?.current?._tippy?.state?.isVisible}
          tooltipProps={{
            content: "Mention",
            position: "bottom",
            delay: [500],
          }}
          color={menuType === "bubble" && "white"}
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
            {showImageInMention && (
              <Avatar size="small" user={{ name, imageUrl }} />
            )}
            <span>{name}</span>
          </MenuItem.Button>
        ))}
      </Menu>
    </Dropdown>
  );
};

export default Mentions;
