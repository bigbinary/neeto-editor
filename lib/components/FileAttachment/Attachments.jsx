import React, { useState } from "react";

import { MenuVertical, File } from "@bigbinary/neeto-icons";

import Dropdown from "components/Common/Dropdown";
import Input from "components/Common/Input";
import MenuButton from "components/Common/MenuButton";

import { DROP_DOWN_OPTIONS_KEYS, KEYS } from "./constant";
import { getInvalidFileTypeErrorMessage, isValidFileName } from "./utils";

const Attachments = ({ uploadedFiles = [], handleRename, dropDownOptions }) => {
  const { Menu, MenuItem } = Dropdown;
  const [fileNameError, setFileNameError] = useState("");
  const [activeFile, setActiveFile] = useState({});

  const onMenuItemClick = ({ key, handler, file }) => {
    if (key === DROP_DOWN_OPTIONS_KEYS.RENAME) {
      setActiveFile(file);
    } else {
      handler(file);
    }
  };

  const handleKeyUp = (e, file) => {
    if (e.key === KEYS.ENTER && handleRename) {
      handleRename(
        {
          signedId: file.response.signed_id,
          fileName: activeFile.name,
        },
        done => {
          if (done) {
            setActiveFile({});
          }
        }
      );
    }
  };

  return (
    <div className="flex flex-wrap gap-4 my-2">
      {uploadedFiles.map((file, index) => (
        <div
          className="border-2 py-1 rounded text-sm flex justify-between items-center min-w-96 width-full"
          key={`file${index}`}
        >
          <div className="flex item-center gap-x-3">
            <div>
              <File className="opacity-75" size={25} />
            </div>
            {activeFile?.id === file.id ? (
              <Input
                autoFocus
                className="w-64"
                error={fileNameError}
                type="text"
                value={activeFile.name}
                onFocus={() => setFileNameError("")}
                onKeyUp={e => handleKeyUp(e, file)}
                onChange={({ target: { value } }) => {
                  if (!isValidFileName(value)) {
                    setFileNameError(getInvalidFileTypeErrorMessage());
                  } else {
                    setFileNameError("");
                  }
                  setActiveFile({ ...activeFile, name: value });
                }}
              />
            ) : (
              <div>{file.name}</div>
            )}
          </div>
          <div className="neeto-editor-attachment-dropdown-options ml-4">
            <Dropdown
              customTarget={() => (
                <MenuButton
                  color="black"
                  data-cy="attachment-option-icon"
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
                    data-cy={`attachment-options-${key}`}
                    key={index}
                    onClick={() => onMenuItemClick({ key, handler, file })}
                  >
                    <span className="capitalize">{label}</span>
                  </MenuItem.Button>
                ))}
              </Menu>
            </Dropdown>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Attachments;
