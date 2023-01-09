import React, { useState } from "react";

import { Link } from "neetoicons";
import { Button, Dropdown, Input } from "neetoui";

import { URL_REGEXP } from "common/constants";

const { Menu } = Dropdown;

const LinkOption = ({ editor }) => {
  const [error, setError] = useState("");
  const [urlString, setUrlString] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const isActive = editor.isActive("link");

  const handleClose = () => {
    setIsOpen(false);
    setUrlString("");
    setError("");
  };

  const handleKeyDown = event => {
    if (event.key === "Escape") {
      handleClose();
    } else if (event.key === "Enter") {
      handleLink();
    }
  };

  const handleDropDownClick = () => {
    setUrlString(editor.getAttributes("link").href);
    setIsOpen(open => !open);
  };

  const handleLink = () => {
    if (URL_REGEXP.test(urlString)) {
      editor.chain().focus().setLink({ href: urlString }).run();
      handleClose();
    } else {
      setError("Please enter a valid url");
    }
  };

  const handleUnlink = () => {
    editor.chain().focus().unsetLink().run();
    setUrlString("");
    handleClose();
  };

  return (
    <Dropdown
      buttonStyle={isActive ? "secondary" : "text"}
      closeOnSelect={false}
      data-cy="neeto-editor-fixed-menu-link-option"
      icon={Link}
      isOpen={isOpen}
      position="bottom"
      buttonProps={{
        tooltipProps: { content: "Link", position: "bottom" },
        className: "neeto-editor-fixed-menu__item",
      }}
      onClick={handleDropDownClick}
      onClose={handleClose}
    >
      <Menu className="neeto-editor-link__item" onKeyDown={handleKeyDown}>
        <Input
          autoFocus
          data-cy="neeto-editor-fixed-menu-link-option-input"
          error={error}
          name="url"
          placeholder="Paste URL"
          value={urlString}
          onChange={({ target: { value } }) => setUrlString(value)}
          onFocus={() => setError("")}
        />
        <Button
          data-cy="neeto-editor-fixed-menu-link-option-link-button"
          label="Link"
          onClick={handleLink}
        />
        {isActive && (
          <Button
            data-cy="neeto-editor-fixed-menu-link-option-unlink-button"
            label="Unlink"
            style="text"
            onClick={handleUnlink}
          />
        )}
      </Menu>
    </Dropdown>
  );
};

export default LinkOption;
