import React from "react";

import { TextSize } from "@bigbinary/neeto-icons";
import Dropdown from "components/Common/Dropdown";
import MenuButton from "components/Common/MenuButton";

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
        <MenuButton
          icon={TextSize}
          iconActive={editor.isActive("heading")}
          tooltipProps={{ content: "Font Size", position: "bottom" }}
          data-cy="neeto-editor-fixed-menu-font-size-option"
        />
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
