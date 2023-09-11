import React, { useEffect, useState } from "react";

import { Button, Input } from "neetoui";
import { useTranslation } from "react-i18next";

import { URL_REGEXP } from "src/common/constants";

const LinkPopOver = ({ editor }) => {
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const [urlString, setUrlString] = useState("");
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const { t } = useTranslation();

  const { view } = editor || {};
  const linkAttributes = editor?.getAttributes("link");

  const updatePopoverPosition = () => {
    if (view) {
      const newPos = view.coordsAtPos(view.state.selection.$to.pos);
      setPopoverPosition({
        top: newPos?.top ? `${newPos.top - 22}px` : 0,
        left: newPos?.left ? `${newPos.left - 50}px` : 0,
      });
    }
  };

  const handleUnlink = () =>
    editor.chain().focus().extendMarkRange("link").unsetLink().run();

  const handleLink = () => {
    if (URL_REGEXP.test(urlString)) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: urlString })
        .run();
      setIsEditing(false);
    } else {
      setError(t("error.invalidUrl"));
    }
  };

  const handleKeyDown = event => {
    if (event.key === "Escape") {
      setIsEditing(false);
    } else if (event.key === "Enter") {
      handleLink();
    }
  };

  const resetLink = () => {
    setUrlString(linkAttributes?.href || "");
    setError("");
  };

  useEffect(() => {
    setUrlString(linkAttributes?.href || "");
    window.addEventListener("scroll", updatePopoverPosition);
    window.addEventListener("resize", updatePopoverPosition);
    updatePopoverPosition();

    return () => {
      window.removeEventListener("scroll", updatePopoverPosition);
      window.removeEventListener("resize", updatePopoverPosition);
    };
  }, [editor, view]);

  const popoverStyle = {
    display: "block",
    position: "fixed",
    top: popoverPosition.top,
    left: popoverPosition.left,
    zIndex: 999,
    transform: `translateY(52px) translateX(${isEditing ? "8px" : "3px"})`,
  };

  const renderEditingMode = () => (
    <div>
      <Input
        autoFocus
        error={error}
        label={t("menu.link")}
        style={{ width: "400px" }}
        value={urlString}
        onChange={({ target: { value } }) => setUrlString(value)}
        onFocus={() => setError("")}
        onKeyDown={handleKeyDown}
      />
      <div className="link-popover__edit-prompt-buttons">
        <Button label={t("menu.link")} size="small" onClick={handleLink} />
        <Button
          label={t("common.cancel")}
          size="small"
          style="secondary"
          onClick={() => {
            resetLink();
            setIsEditing(false);
          }}
        />
      </div>
    </div>
  );

  const renderViewMode = () => (
    <>
      <a href={linkAttributes?.href} rel="noreferrer" target="_blank">
        {linkAttributes?.href}
      </a>
      {" - "}
      <button
        className="link-popover-option"
        onClick={() => setIsEditing(true)}
      >
        {t("common.edit")}
      </button>
      <span>|</span>
      <button className="link-popover-option" onClick={handleUnlink}>
        {t("common.unlink")}
      </button>
    </>
  );

  return (
    <div className="link-popover" style={popoverStyle}>
      {isEditing ? renderEditingMode() : renderViewMode()}
    </div>
  );
};

export default LinkPopOver;
