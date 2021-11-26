import React, { useRef } from "react";
import { Link } from "@bigbinary/neeto-icons";
import URLForm from "components/URLForm";
import Dropdown from "components/common/Dropdown";

import {
  ICON_COLOR_ACTIVE,
  ICON_COLOR_INACTIVE,
  MENU_ICON_SIZE,
} from "./constants";

const LinkOption = ({ editor }) => {
  const dropdownRef = useRef();

  const isActive = editor.isActive("link");

  const onSubmit = (url) => {
    editor.chain().focus().setLink({ href: url }).run();
    dropdownRef.current?.close();
  };

  const onClickTrigger = (event) => {
    if (isActive) {
      event.stopPropagation();
      editor.chain().focus().unsetLink().run();
    }
  };

  return (
    <Dropdown
      ref={dropdownRef}
      customTarget={() => (
        <button
          className="h-full p-3 transition-colors editor-fixed-menu--item"
          onClick={onClickTrigger}
        >
          <Link
            size={MENU_ICON_SIZE}
            color={isActive ? ICON_COLOR_ACTIVE : ICON_COLOR_INACTIVE}
          />
        </button>
      )}
      className="fontsize-dropdown"
      position="bottom"
      closeOnSelect={false}
    >
      <URLForm
        onSubmit={onSubmit}
        className="mx-1 add-link-form"
        placeholder="Paste link"
      />
    </Dropdown>
  );
};

export default LinkOption;
