import React, { useState } from "react";

import { MenuVertical, File } from "neetoicons";
import { Dropdown, Input, Typography } from "neetoui";

import { ATTACHMENT_OPTIONS } from "./constants";
import { validFileName } from "./utils";

const { Menu, MenuItem } = Dropdown;

const Attachment = ({ attachment, dropDownOptions = [] }) => {
  const [activeFile, setActiveFile] = useState({});
  const [error, setError] = useState("");

  const onMenuItemClick = ({ key, handler, attachment }) => {
    if (key === ATTACHMENT_OPTIONS.RENAME) {
      setActiveFile(attachment);
    } else {
      handler(attachment);
    }
  };

  const handleKeyDown = ({ event, attachment, key }) => {
    const { handler = undefined } = dropDownOptions.find(
      option => option.label === key
    );

    if (event.key === "Enter" && handler && error === "") {
      handler(
        {
          signedId: attachment.signedId,
          fileName: activeFile.filename,
        },
        fileRenamed => fileRenamed && setActiveFile({})
      );
    }

    if (event.key === "Escape") setActiveFile({});
  };

  const handleInputChange = value => {
    const error = validFileName(value);
    setError(error);
    setActiveFile({ ...activeFile, filename: value });
  };

  return (
    <div className="ne-file-attachment-wrapper">
      <div className="ne-file-attachment-inner-wrapper">
        <div>
          <File className="icon-opacity-75" size={25} />
        </div>
        {activeFile.signedId === attachment.signedId ? (
          <Input
            autoFocus
            className="input-width"
            error={error}
            type="text"
            value={activeFile.filename}
            onChange={event => {
              handleInputChange(event.target.value);
            }}
            onKeyDown={event =>
              handleKeyDown({
                event,
                attachment,
                key: ATTACHMENT_OPTIONS.RENAME,
              })
            }
          />
        ) : (
          <Typography className="truncate-ellipsis">
            {attachment.filename}
          </Typography>
        )}
      </div>
      <div className="drop-down-container">
        <Dropdown buttonStyle="text" icon={MenuVertical}>
          <Menu>
            {dropDownOptions.map(({ label, handler }) => (
              <MenuItem.Button
                key={label}
                onClick={() =>
                  onMenuItemClick({ key: label, handler, attachment })
                }
              >
                {label}
              </MenuItem.Button>
            ))}
          </Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Attachment;
