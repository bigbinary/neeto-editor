import React, { useState } from "react";

import { Link } from "neetoicons";

import Button from "components/Common/Button";
import Dropdown from "components/Common/Dropdown";
import Input from "components/Common/Input";
import MenuButton from "components/Common/MenuButton";
import { UrlRegExp } from "constants/regexp";

const LinkOption = ({ editor }) => {
  const [error, setError] = useState("");
  const [urlString, setUrlString] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const isActive = editor.isActive("link");

  const onClickTrigger = () =>
    setUrlString(editor.getAttributes("link").href || "");

  const handleClose = () => setIsOpen(false);

  const handleKeyDown = event => {
    if (event.key === "Escape") {
      handleClose();
    } else if (event.key === "Enter") {
      handleLink();
    }
  };

  const handleLink = () => {
    if (UrlRegExp.test(urlString)) {
      editor.chain().focus().setLink({ href: urlString }).run();
      handleClose();
    } else {
      setError("Please enter a valid url");
    }
  };

  const handleUnlink = () => {
    editor.chain().focus().unsetLink().run();
    handleClose();
  };

  return (
    <Dropdown
      isOpen={isOpen}
      onClick={() => setIsOpen(open => !open)}
      onClose={handleClose}
      customTarget={() => (
        <MenuButton
          icon={Link}
          iconActive={isActive}
          onClick={onClickTrigger}
          tooltipProps={{ content: "Link", position: "bottom", delay: [500] }}
          data-cy="neeto-editor-fixed-menu-link-option"
        />
      )}
      className="neeto-editor-link-wrapper"
      closeOnSelect={false}
      position="bottom"
    >
      <div onKeyDown={handleKeyDown} className="neeto-editor-link__item">
        <Input
          autoFocus
          name="url"
          value={urlString}
          placeholder="Paste URL"
          onFocus={() => setError("")}
          error={error}
          onChange={({ target: { value } }) => setUrlString(value)}
          data-cy="neeto-editor-fixed-menu-link-option-input"
        />
        <Button
          label="Link"
          onClick={handleLink}
          data-cy="neeto-editor-fixed-menu-link-option-link-button"
        />
        {isActive && (
          <Button
            label="Unlink"
            onClick={handleUnlink}
            data-cy="neeto-editor-fixed-menu-link-option-unlink-button"
          />
        )}
      </div>
    </Dropdown>
  );
};

export default LinkOption;
