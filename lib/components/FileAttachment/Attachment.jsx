import React, { useState } from "react";

import { MenuVertical, File } from "@bigbinary/neeto-icons";

import Dropdown from "components/Common/Dropdown";
import Input from "components/Common/Input";
import MenuButton from "components/Common/MenuButton";

import { DROP_DOWN_OPTIONS_KEYS, KEYS } from "./constant";
import { validFileName } from "./utils";

const { Menu, MenuItem } = Dropdown;

const Attachment = ({ attachment, dropDownOptions = [] }) => {
  const [error, setError] = useState("");
  const [activeFile, setActiveFile] = useState({});

  const onMenuItemClick = ({ key, handler, attachment }) => {
    if (key === DROP_DOWN_OPTIONS_KEYS.RENAME) {
      setActiveFile(attachment);
    } else {
      handler(attachment);
    }
  };

  const handleKeyDown = ({ event, attachment, key }) => {
    const { handler = undefined } = dropDownOptions.find(
      option => option.key === key
    );

    if (event.key === KEYS.ENTER && handler) {
      handler()(
        {
          signedId: attachment.signedId,
          fileName: activeFile.filename,
        },
        renamed => renamed && setActiveFile({})
      );
    }
  };

  const handleInputChange = value => {
    const fileNameErrorMessage = validFileName(value);
    fileNameErrorMessage ? setError(fileNameErrorMessage) : setError("");

    setActiveFile({ ...activeFile, filename: value });
  };

  return (
    <div className="ne-file-attachment-wrapper">
      <div className="ne-file-attachment-inner-wrapper">
        <div>
          <File className="icon-opacity-75" size={25} />
        </div>
        {activeFile?.filename === attachment.filename ? (
          <Input
            autoFocus
            className="input-width"
            error={error}
            type="text"
            value={activeFile.filename}
            onFocus={() => setError("")}
            onChange={event => {
              handleInputChange(event.target.value);
            }}
            onKeyDown={event =>
              handleKeyDown({
                event,
                attachment,
                key: DROP_DOWN_OPTIONS_KEYS.RENAME,
              })
            }
          />
        ) : (
          <div>{attachment.filename}</div>
        )}
      </div>
      <div className="drop-down-container">
        <Dropdown
          customTarget={() => (
            <MenuButton
              color="black"
              icon={MenuVertical}
              tooltipProps={{
                content: "Attachment Options",
                position: "right-end",
                delay: [500],
              }}
            />
          )}
        >
          <Menu>
            {dropDownOptions.map(({ key, label, handler }, index) => (
              <MenuItem.Button
                key={index}
                onClick={() => onMenuItemClick({ key, handler, attachment })}
              >
                <span className="menu-label">{label}</span>
              </MenuItem.Button>
            ))}
          </Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Attachment;
