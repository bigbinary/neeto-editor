import React from "react";

import { TextSize } from "@bigbinary/neeto-icons";
import Dropdown from "components/Common/Dropdown";
import ToolTip from "components/Common/ToolTip";

import {
  MENU_ICON_SIZE,
  ICON_COLOR_ACTIVE,
  ICON_COLOR_INACTIVE,
} from "./constants";
import classnames from "classnames";

const FontSizeOption = ({ editor }) => {
  const options = [
    { label: "H1", value: 1 },
    { label: "H2", value: 2 },
    { label: "H3", value: 3 },
  ];

  const isActive = (level) => editor.isActive("heading", { level });

  const onClick = (level) =>
    editor.chain().focus().toggleHeading({ level }).run();

  return (
    <Dropdown
      customTarget={() => (
        <ToolTip content="Font Size" position="bottom">
          <button
            type="button"
            className="neeto-editor-fixed-menu__item"
            data-cy="neeto-editor-fixed-menu-font-size-option"
          >
            <TextSize
              size={MENU_ICON_SIZE}
              color={
                editor.isActive("heading")
                  ? ICON_COLOR_ACTIVE
                  : ICON_COLOR_INACTIVE
              }
            />
          </button>
        </ToolTip>
      )}
      className="neeto-editor-font-size-wrapper"
      placement="bottom"
    >
      {options.map(({ label, value }) => (
        <li
          onClick={() => onClick(value)}
          key={value}
          className={classnames({ active: isActive(value) })}
          data-cy={`neeto-editor-fixed-menu-font-size-option-${label}`}
        >
          {label}
        </li>
      ))}
    </Dropdown>
  );
};

export default FontSizeOption;
