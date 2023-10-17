import React, { useEffect, useState, useRef } from "react";

import { useOnClickOutside } from "neetocommons/react-utils";
import { Button, Input } from "neetoui";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";

import { validateAndFormatUrl } from "./utils";

const LinkPopOver = ({ editor }) => {
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const [urlString, setUrlString] = useState("");
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLinkActive, setIsLinkActive] = useState(editor?.isActive("link"));

  const popOverRef = useRef(null);

  const { t } = useTranslation();

  const { view } = editor || {};
  const linkAttributes = editor?.getAttributes("link");

  const updatePopoverPosition = () => {
    if (view && popOverRef.current) {
      const newPos = view.coordsAtPos(view.state.selection.$to.pos);

      const popoverRect = popOverRef.current?.getBoundingClientRect();

      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      const maxLeft = screenWidth - popoverRect.width;
      const maxTop = screenHeight - popoverRect.height;

      const adjustedLeft = newPos?.left
        ? Math.min(newPos.left - 50, maxLeft)
        : 0;
      const adjustedTop = newPos?.top ? Math.min(newPos.top - 22, maxTop) : 0;

      setPopoverPosition({
        top: `${adjustedTop}px`,
        left: `${adjustedLeft}px`,
      });
    }
  };

  const handleUnlink = () =>
    editor.chain().focus().extendMarkRange("link").unsetLink().run();

  const handleLink = () => {
    const formattedUrl = validateAndFormatUrl(urlString);

    if (formattedUrl) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: formattedUrl })
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

  const removePopover = () => {
    setIsEditing(false);
    setIsLinkActive(false);
  };

  useOnClickOutside(popOverRef, removePopover);

  useEffect(() => {
    window.addEventListener("resize", removePopover);
    window.addEventListener("wheel", removePopover);

    return () => {
      window.removeEventListener("resize", removePopover);
      window.removeEventListener("wheel", removePopover);
    };
  }, []);

  useEffect(() => {
    const isActive = editor?.isActive("link");
    setIsLinkActive(isActive);
    if (isActive) {
      updatePopoverPosition();
      setUrlString(linkAttributes?.href || "");
    }
  }, [view?.state?.selection?.$from?.pos, isEditing]);

  const popoverStyle = {
    display: "block",
    position: "fixed",
    top: popoverPosition.top,
    left: popoverPosition.left,
    transform: `translateY(52px) translateX(${isEditing ? "8px" : "3px"})`,
  };

  const renderEditingMode = () => (
    <>
      <Input
        autoFocus
        {...{ error }}
        label={t("menu.link")}
        placeholder={t("placeholders.url")}
        style={{ width: "250px" }}
        value={urlString}
        onChange={({ target: { value } }) => setUrlString(value)}
        onFocus={() => setError("")}
        onKeyDown={handleKeyDown}
      />
      <div className="ne-link-popover__edit-prompt-buttons">
        <Button label={t("menu.link")} size="small" onClick={handleLink} />
        <Button
          label={t("common.cancel")}
          size="small"
          style="text"
          onClick={() => {
            resetLink();
            setIsEditing(false);
          }}
        />
      </div>
    </>
  );

  const renderViewMode = () => (
    <>
      <a href={linkAttributes?.href} rel="noreferrer" target="_blank">
        {linkAttributes?.href}
      </a>
      {" - "}
      <Button
        className="ne-link-popover__option-button"
        label={t("common.edit")}
        size="small"
        style="link"
        onClick={() => setIsEditing(true)}
      />
      <span>|</span>
      <Button
        className="ne-link-popover__option-button"
        label={t("common.unlink")}
        size="small"
        style="link"
        onClick={handleUnlink}
      />
    </>
  );

  return createPortal(
    isLinkActive ? (
      <div
        className="ne-link-popover"
        id="ne-link-view-popover"
        ref={popOverRef}
        style={popoverStyle}
      >
        {isEditing ? renderEditingMode() : renderViewMode()}
      </div>
    ) : null,
    document.body
  );
};

export default LinkPopOver;
