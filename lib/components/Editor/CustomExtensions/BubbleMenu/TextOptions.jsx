import React, { useState } from "react";

import Tippy from "@tippyjs/react";
import { Down } from "neetoicons";

import {
  getNodeType,
  getTextMenuDefaultOptions,
  getTextMenuDropdownOptions,
} from "./helpers";
import LinkOption from "./LinkOption";
import Option from "./Option";

const TextOptions = ({
  editor,
  options,
  setIsInvalidLink,
  isLinkOptionActive,
  setIsLinkOptionActive,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const fixedOptions = getTextMenuDefaultOptions({
    editor,
    setIsLinkOptionActive,
  }).filter(({ optionName }) => options.includes(optionName));
  const dropdownOptions = getTextMenuDropdownOptions({ editor });
  const nodeType = getNodeType(dropdownOptions);

  const handleAnimateInvalidLink = () => {
    setIsInvalidLink(true);
    setTimeout(() => {
      setIsInvalidLink(false);
    }, 1000);
  };

  const handleClose = () => setIsDropdownOpen(false);

  if (isLinkOptionActive) {
    return (
      <LinkOption
        editor={editor}
        handleClose={() => setIsLinkOptionActive(false)}
        handleAnimateInvalidLink={handleAnimateInvalidLink}
      />
    );
  }

  return (
    <>
      <Tippy
        arrow={false}
        interactive
        placement="bottom"
        visible={isDropdownOpen}
        onClickOutside={handleClose}
        content={
          <div className="neeto-editor-bubble-menu__dropdown">
            {dropdownOptions.map(({ optionName, command }) => (
              <button
                type="button"
                key={optionName}
                onClick={() => {
                  command();
                  handleClose();
                }}
                className="neeto-editor-bubble-menu__item neeto-editor-bubble-menu__dropdown-item"
              >
                {optionName}
              </button>
            ))}
          </div>
        }
      >
        <button
          type="button"
          onClick={() => setIsDropdownOpen(open => !open)}
          className="neeto-editor-bubble-menu__item neeto-editor-bubble-menu__dropdown-target"
        >
          {nodeType}
          <Down size={14} />
        </button>
      </Tippy>
      {fixedOptions.map(option => (
        <Option {...option} key={option.optionName} />
      ))}
    </>
  );
};

export default TextOptions;
