import React, { useEffect, useState, useRef } from "react";

import { getMarkRange, getMarkType } from "@tiptap/react";
import { useOnClickOutside } from "neetocommons/react-utils";
import { Button, Switch } from "neetoui";
import { Form, Input } from "neetoui/formik";
import { equals, isNil } from "ramda";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";

import { LINK_VALIDATION_SCHEMA } from "./constants";
import { validateAndFormatUrl } from "./utils";

const LinkPopOver = ({ editor }) => {
  const { view } = editor || {};
  const { from } = editor.state.selection;
  const initialTextContent = view?.state?.doc?.nodeAt(from)?.text || "";

  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const [isLinkActive, setIsLinkActive] = useState(editor?.isActive("link"));

  const popOverRef = useRef(null);

  const { t } = useTranslation();

  const linkAttributes = editor?.getAttributes("link");

  const updatePopoverPosition = () => {
    if (!(view && popOverRef.current)) return;
    const newPos = view.coordsAtPos(view.state.selection.$to.pos);

    const popoverRect = popOverRef.current?.getBoundingClientRect();

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const maxLeft = screenWidth - popoverRect.width;
    const maxTop = screenHeight - popoverRect.height - 50;

    const adjustedLeft = newPos?.left ? Math.min(newPos.left - 50, maxLeft) : 0;
    const adjustedTop = newPos?.top ? Math.min(newPos.top - 22, maxTop) : 0;

    setPopoverPosition({
      top: `${adjustedTop}px`,
      left: `${adjustedLeft}px`,
    });
  };

  const handleUnlink = () =>
    editor.chain().focus().extendMarkRange("link").unsetLink().run();

  const removePopover = () => {
    setIsEditing(false);
    setIsLinkActive(false);
  };

  const popoverStyle = {
    display: "block",
    position: "fixed",
    top: popoverPosition.top,
    left: popoverPosition.left,
    transform: `translateY(52px) translateX(${isEditing ? "8px" : "3px"})`,
  };

  const handleSubmit = ({ textContent, urlString, openInNewTab }) => {
    const formattedUrl = validateAndFormatUrl(urlString);
    if (equals(textContent, initialTextContent)) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: formattedUrl, target: openInNewTab ? "_blank" : "" })
        .run();
      setIsEditing(false);

      return;
    }
    const { state, dispatch } = editor.view;
    const type = getMarkType("link", state.schema);
    const { $to } = state.selection;
    const { from = null, to = null } = getMarkRange($to, type) || {};

    if (isNil(from) || isNil(to)) return;

    const attrs = { href: formattedUrl, target: openInNewTab ? "_blank" : "" };
    const linkMark = state.schema.marks.link.create(attrs);
    const linkTextWithMark = state.schema.text(textContent, [linkMark]);

    const tr = state.tr.replaceWith(from, to, linkTextWithMark);
    dispatch(tr);

    setIsEditing(false);
    editor.view.focus();
    editor.commands.extendMarkRange("link");
  };

  const handleKeyDown = event =>
    equals(event.key, "Escape") && setIsEditing(false);

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
    }
  }, [view?.state?.selection?.$from?.pos, isEditing]);

  const renderEditingMode = () => (
    <Form
      formikProps={{
        initialValues: {
          textContent: initialTextContent,
          urlString: linkAttributes?.href || "",
          openInNewTab: linkAttributes?.target === "_blank",
        },
        onSubmit: handleSubmit,
        validationSchema: LINK_VALIDATION_SCHEMA,
      }}
    >
      {({ dirty, isSubmitting, setFieldValue, values }) => (
        <>
          <Input
            required
            data-cy="neeto-editor-edit-link-text-input"
            label={t("neetoEditor.common.text")}
            name="textContent"
            placeholder={t("neetoEditor.placeholders.enterText")}
            style={{ width: "250px" }}
            onKeyDown={handleKeyDown}
          />
          <Input
            autoFocus
            required
            className="ne-link-popover__url-input"
            data-cy="neeto-editor-edit-link-url-input"
            label={t("neetoEditor.common.url")}
            name="urlString"
            placeholder={t("neetoEditor.placeholders.url")}
            style={{ width: "250px" }}
            onKeyDown={handleKeyDown}
          />
          <Switch
            checked={values.openInNewTab}
            label={t("neetoEditor.common.openInNewTab")}
            onChange={() => {
              setFieldValue("openInNewTab", !values.openInNewTab);
            }}
          />
          <div className="ne-link-popover__edit-prompt-buttons">
            <Button
              data-cy="neeto-editor-edit-link"
              disabled={!dirty}
              label={t("neetoEditor.menu.link")}
              loading={isSubmitting}
              size="small"
              type="submit"
            />
            <Button
              data-cy="neeto-editor-edit-link-cancel"
              label={t("neetoEditor.common.cancel")}
              size="small"
              style="text"
              onClick={() => setIsEditing(false)}
            />
          </div>
        </>
      )}
    </Form>
  );

  const renderViewMode = () => (
    <>
      <a href={linkAttributes?.href} rel="noreferrer" target="_blank">
        {linkAttributes?.href}
      </a>
      {" - "}
      <Button
        className="ne-link-popover__option-button"
        data-cy="neeto-editor-link-popover-edit"
        label={t("neetoEditor.common.edit")}
        size="small"
        style="link"
        onClick={() => setIsEditing(true)}
      />
      <span>|</span>
      <Button
        className="ne-link-popover__option-button"
        data-cy="neeto-editor-link-popover-unlink"
        label={t("neetoEditor.common.unlink")}
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
