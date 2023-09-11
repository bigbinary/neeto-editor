import React, { useEffect, useState, useRef } from "react";

import { Link } from "neetoicons";
import { Button, Dropdown, Input } from "neetoui";
import { min } from "ramda";
import { useTranslation } from "react-i18next";

import { URL_REGEXP } from "common/constants";

const { Menu } = Dropdown;

const LinkOption = ({ editor, tooltipContent, menuRef }) => {
  const [error, setError] = useState("");
  const [urlString, setUrlString] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { t } = useTranslation();

  const linkOptionRef = useRef(null);

  const isActive = editor.isActive("link");

  const handleDropDownClick = () => {
    setUrlString(editor.getAttributes("link").href);
    setIsOpen(open => !open);
  };

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

  const handleLink = () => {
    if (URL_REGEXP.test(urlString)) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: urlString })
        .run();
      handleClose();
    } else {
      setError(t("error.invalidUrl"));
    }
  };

  const handleUnlink = () => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    setUrlString("");
    handleClose();
  };

  const handleWidthChange = () => {
    if (!linkOptionRef.current) return;

    linkOptionRef.current.style.width = "auto";
    linkOptionRef.current.style.width = `${min(
      550,
      min(
        menuRef.current?.offsetWidth * 0.5,
        linkOptionRef.current?.scrollWidth
      )
    )}px`;
  };

  useEffect(() => {
    editor.commands.setHighlightInternal("#ACCEF7");

    if (!isOpen) {
      editor.commands.unsetHighlightInternal();
      editor.commands.removeEmptyTextStyle();
    }
  }, [isOpen, editor]);

  useEffect(() => {
    isOpen && handleWidthChange();
  }, [linkOptionRef.current]);

  return (
    <Dropdown
      buttonStyle={isOpen || isActive ? "secondary" : "text"}
      closeOnSelect={false}
      data-cy="neeto-editor-fixed-menu-link-option"
      icon={Link}
      isOpen={isOpen}
      position="bottom"
      buttonProps={{
        tabIndex: -1,
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
          ref={linkOptionRef}
          value={urlString}
          onFocus={() => setError("")}
          onChange={({ target: { value } }) => {
            setUrlString(value);
            handleWidthChange();
          }}
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
