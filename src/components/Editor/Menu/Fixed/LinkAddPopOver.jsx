import React, { useState, useEffect, useRef } from "react";

import { Button, Input } from "neetoui";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";

import { URL_REGEXP } from "src/common/constants";
import { isNilOrEmpty } from "utils/common";

const LinkAddPopOver = ({ isAddLinkActive, setIsAddLinkActive, editor }) => {
  const { from, to } = editor.state.selection;
  const text = editor.state.doc.textBetween(from, to, "");

  const [linkText, setLinkText] = useState(text);
  const [linkUrl, setLinkUrl] = useState("");
  const [error, setError] = useState("");
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });

  const popOverRef = useRef(null);

  const { t } = useTranslation();

  const isLinkTextPresent = !isNilOrEmpty(linkText);
  const popoverStyle = {
    display: "block",
    position: "fixed",
    top: popoverPosition.top,
    left: popoverPosition.left,
    zIndex: 999,
    transform: "translateY(52px) translateX(8px)",
  };

  const handleAddLink = () => {
    const { state, dispatch } = editor.view;
    const { from, to } = state.selection;
    const attrs = { href: linkUrl };

    if (!URL_REGEXP.test(linkUrl)) {
      setError(t("error.invalidUrl"));

      return;
    }

    const linkMark = state.schema.marks.link.create(attrs);
    const linkTextWithMark = state.schema.text(linkText, [linkMark]);

    const tr = state.tr.replaceWith(from, to, linkTextWithMark);
    dispatch(tr);
    removePopover();
  };

  const removePopover = () => {
    editor.view.focus();
    setIsAddLinkActive(false);
  };

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      handleAddLink();
    } else if (e.key === "Escape") {
      removePopover();
    }
  };

  const updatePopoverPosition = () => {
    if (popOverRef.current) {
      const newPos = editor.view.coordsAtPos(
        editor.view.state.selection.$to.pos
      );

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

  useEffect(() => {
    if (editor && isAddLinkActive) {
      updatePopoverPosition();
    }
    window.addEventListener("resize", removePopover);
    window.addEventListener("wheel", removePopover);

    return () => {
      window.removeEventListener("resize", removePopover);
      window.removeEventListener("wheel", removePopover);
    };
  }, []);

  return isAddLinkActive
    ? createPortal(
        <div
          className="ne-link-popover"
          id="ne-link-add-popover"
          ref={popOverRef}
          style={popoverStyle}
        >
          <Input
            autoFocus={!isLinkTextPresent}
            label={t("common.text")}
            placeholder={t("placeholders.enterText")}
            style={{ width: "400px" }}
            value={linkText}
            onChange={({ target: { value } }) => setLinkText(value)}
          />
          <Input
            autoFocus={isLinkTextPresent}
            label={t("menu.link")}
            {...{ error }}
            placeholder={t("placeholders.url")}
            style={{ width: "400px" }}
            value={linkUrl}
            onChange={({ target: { value } }) => setLinkUrl(value)}
            onFocus={() => setError("")}
            onKeyDown={handleKeyDown}
          />
          <div className="ne-link-popover__edit-prompt-buttons">
            <Button
              label={t("menu.link")}
              size="small"
              onClick={handleAddLink}
            />
            <Button
              label={t("common.cancel")}
              size="small"
              style="text"
              onClick={removePopover}
            />
          </div>
        </div>,
        document.body
      )
    : null;
};

export default LinkAddPopOver;
