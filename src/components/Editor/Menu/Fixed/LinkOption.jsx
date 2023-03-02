import React, { useState } from "react";

import { Link } from "neetoicons";
import { Button, Dropdown, Input } from "neetoui";
import { useTranslation } from "react-i18next";

import { URL_REGEXP } from "common/constants";

const { Menu } = Dropdown;

const LinkOption = ({ editor, tooltipContent }) => {
  const { t } = useTranslation();

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
      setError(t("error.invalid-url"));
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
        tooltipProps: { content: tooltipContent, position: "bottom" },
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
          placeholder={t("placeholders.url")}
          value={urlString}
          onChange={({ target: { value } }) => setUrlString(value)}
          onFocus={() => setError("")}
        />
        <Button
          data-cy="neeto-editor-fixed-menu-link-option-link-button"
          label={t("menu.link")}
          onClick={handleLink}
        />
        {isActive && (
          <Button
            data-cy="neeto-editor-fixed-menu-link-option-unlink-button"
            label={t("common.unlink")}
            style="text"
            onClick={handleUnlink}
          />
        )}
      </Menu>
    </Dropdown>
  );
};

export default LinkOption;
