import React, { useRef, useState } from "react";
import { Link } from "@bigbinary/neeto-icons";

import Dropdown from "components/Common/Dropdown";
import Input from "components/Common/Input";
import Button from "components/Common/Button";
import { UrlRegExp } from "constants/regexp";

import {
  ICON_COLOR_ACTIVE,
  ICON_COLOR_INACTIVE,
  MENU_ICON_SIZE,
} from "./constants";

const LinkOption = ({ editor }) => {
  const dropdownRef = useRef();
  const [error, setError] = useState("");
  const [urlString, setUrlString] = useState("");

  const isActive = editor.isActive("link");

  const onClickTrigger = () => {
    setUrlString(editor.getAttributes("link").href || "");
  };

  const handleLink = (event) => {
    event.preventDefault();
    if (UrlRegExp.test(urlString)) {
      editor.chain().focus().setLink({ href: urlString }).run();
      dropdownRef.current?.close();
    } else {
      setError("Please enter a valid url");
    }
  };

  const handleUnlink = () => {
    editor.chain().focus().unsetLink().run();
    dropdownRef.current?.close();
  };

  return (
    <Dropdown
      ref={dropdownRef}
      customTarget={() => (
        <button
          type="button"
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
      <div className="flex py-1 space-x-3 add-link-form">
        <div className="flex-row w-full">
          <Input
            name="url"
            value={urlString}
            placeholder="Paste URL"
            onFocus={() => setError("")}
            error={error}
            onChange={({ target: { value } }) => setUrlString(value)}
          />
        </div>
        <Button label="Link" onClick={handleLink} className="self-start" />
        {isActive ? (
          <Button
            label="Unlink"
            onClick={handleUnlink}
            className="self-start"
          />
        ) : null}
      </div>
    </Dropdown>
  );
};

export default LinkOption;
