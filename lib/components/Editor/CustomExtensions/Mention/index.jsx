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
          tooltipProps={{
            content: "Mention",
            position: "bottom",
            delay: [500],
          }}
          data-cy="neeto-editor-mention-option"
        />
      )}
    >
      <div className="neeto-editor-mentions__wrapper neeto-editor-mentions__wrapper--small">
        {mentions.map(({ key, name, imageUrl }) => (
          <button
            className={
              "neeto-editor-mentions__item neeto-editor-mentions__item--light"
            }
            key={key}
            onClick={() => editor.commands.setMention(name)}
            type="button"
            data-cy={`neeto-editor-mention-option-${key}`}
          >
            {showImageInMention && (
              <Avatar size="small" user={{ name, imageUrl }} />
            )}
            <p>{name}</p>
          </button>
        ))}
      </div>
    </Dropdown>
  );
};

export default Mentions;
