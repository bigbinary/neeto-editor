import React, { useRef } from "react";
import { Email } from "@bigbinary/neeto-icons";

import Avatar from "components/Common/Avatar";
import Dropdown from "components/Common/Dropdown";

import {
  MENU_ICON_SIZE,
  ICON_COLOR_ACTIVE,
  ICON_COLOR_INACTIVE,
} from "../FixedMenu/constants";

const Mentions = ({ editor, mentions, showImageInMention }) => {
  const dropdownRef = useRef();

  if (!(mentions && mentions.length)) {
    return null;
  }

  return (
    <Dropdown
      ref={dropdownRef}
      customTarget={() => (
        <button
          type="button"
          className="neeto-editor-fixed-menu__item"
          data-cy="neeto-editor-mention-option"
        >
          <Email
            size={MENU_ICON_SIZE}
            color={
              dropdownRef.current?.visible
                ? ICON_COLOR_ACTIVE
                : ICON_COLOR_INACTIVE
            }
          />
        </button>
      )}
    >
      <div className="neeto-editor-mentions__wrapper neeto-editor-mentions__wrapper--small">
        {mentions.map((item) => {
          const label = typeof item === "string" ? item : item.label;
          const imageUrl = typeof item === "string" ? "" : item.imageUrl;

          return (
            <button
              className={
                "neeto-editor-mentions__item neeto-editor-mentions__item--light"
              }
              key={label}
              onClick={() => editor.commands.setMention(label)}
              type="button"
              data-cy={`neeto-editor-mention-option-${item.label}`}
            >
              {showImageInMention && (
                <Avatar size="small" user={{ name: label, imageUrl }} />
              )}
              <p>{label}</p>
            </button>
          );
        })}
      </div>
    </Dropdown>
  );
};

export default Mentions;
