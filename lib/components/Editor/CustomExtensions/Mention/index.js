import React, { useRef } from "react";
import { Email } from "@bigbinary/neeto-icons";

import Avatar from "components/Common/Avatar";
import Dropdown from "components/Common/Dropdown";
import MenuButton from "components/Common/MenuButton";

const Mentions = ({ editor, mentions, showImageInMention }) => {
  const dropdownRef = useRef();

  if (!(mentions && mentions.length)) {
    return null;
  }

  return (
    <Dropdown
      ref={dropdownRef}
      customTarget={() => (
        <MenuButton
          icon={Email}
          iconActive={dropdownRef.current?.visible}
          tooltipProps={{ content: "Mention", position: "bottom" }}
          data-cy="neeto-editor-mention-option"
        />
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
