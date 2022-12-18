import React, { useState } from "react";

import { Link } from "neetoicons";

import { URL_REGEXP } from "common/constants";
import { Button } from "neetoui";
import Dropdown from "components/Common/Dropdown";
import Input from "components/Common/Input";
import MenuButton from "components/Common/MenuButton";

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
    if (URL_REGEXP.test(urlString)) {
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
      className="neeto-editor-link-wrapper"
      closeOnSelect={false}
      isOpen={isOpen}
      position="bottom"
      customTarget={() => (
        <MenuButton
          data-cy="neeto-editor-fixed-menu-link-option"
          icon={Link}
          iconActive={isActive}
          tooltipProps={{ content: "Link", position: "bottom", delay: [500] }}
          onClick={onClickTrigger}
        />
      )}
      onClick={() => setIsOpen(open => !open)}
      onClose={handleClose}
    >
      <div className="neeto-editor-link__item" onKeyDown={handleKeyDown}>
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
            onClick={handleUnlink}
          />
        )}
      </div>
    </Dropdown>
  );
};

export default LinkOption;
