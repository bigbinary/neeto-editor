import React, { useImperativeHandle, useState, useRef } from "react";

import { useEditor, EditorContent } from "@tiptap/react";
import classnames from "classnames";
import { EDITOR_OPTIONS } from "common/constants";
import { noop, slugify } from "neetocist";
import { Label } from "neetoui";
import { EditorView } from "prosemirror-view";

import ErrorWrapper from "components/Common/ErrorWrapper";
import useEditorWarnings from "hooks/useEditorWarnings";
import "src/styles/editor/menu.scss";

import { DEFAULT_EDITOR_OPTIONS } from "./constants";
import CharacterCountWrapper from "./CustomExtensions/CharacterCount";
import EmbedOption from "./CustomExtensions/Embeds";
import useCustomExtensions from "./CustomExtensions/hooks/useCustomExtensions";
import TableActionMenu from "./CustomExtensions/Table/TableActionMenu";
import LinkPopOver from "./LinkPopOver";
import MediaUploader from "./MediaUploader";
import Menu from "./Menu";
import {
  getEditorStyles,
  clipboardTextParser,
  setInitialPosition,
} from "./utils";

import Attachments from "../Attachments";

const Editor = (
  {
    addonCommands = [],
    addons = [],
    attachments = [],
    attachmentsConfig = {},
    autoFocus = false,
    className,
    contentClassName,
    errorWrapperClassName,
    contentAttributes = {},
    menuClassName,
    attachmentsClassName,
    isMenuIndependent = false,
    isMenuCollapsible = false,
    defaults = DEFAULT_EDITOR_OPTIONS,
    editorSecrets = {},
    error = null,
    extensions = [],
    hideSlashCommands = false,
    initialValue = "",
    isCharacterCountActive = false,
    keyboardShortcuts = [],
    label = "",
    mentions = [],
    menuType = "fixed",
    placeholder,
    required = false,
    rows = 6,
    tooltips = {},
    variables = [],
    onChange = noop,
    onFocus = noop,
    onBlur = noop,
    onSubmit = noop,
    onChangeAttachments = noop,
    children,
    openImageInNewTab = true,
    openLinkInNewTab = true,
    ...otherProps
  },
  ref
) => {
  const [isAttachmentsUploading, setIsAttachmentsUploading] = useState(false);

  const dragDropRef = useRef(null);
  const isAttachmentsActive = addons.includes(EDITOR_OPTIONS.ATTACHMENTS);
  const isVideoEmbedActive = addons.includes(EDITOR_OPTIONS.VIDEO_EMBED);
  const isMediaUploaderActive =
    addons.includes(EDITOR_OPTIONS.IMAGE_UPLOAD) ||
    addons.includes(EDITOR_OPTIONS.VIDEO_UPLOAD);
  const isFixedMenuActive = menuType === "fixed";
  const isBubbleMenuActive = menuType === "bubble";
  const isSlashCommandsActive = !hideSlashCommands;
  const isPlaceholderActive = !!placeholder;
  const [isEmbedModalOpen, setIsEmbedModalOpen] = useState(false);
  const [mediaUploader, setMediaUploader] = useState({
    image: false,
    video: false,
  });

  const addAttachmentsRef = useRef(null);

  const attachmentProps = {
    handleUploadAttachments: () =>
      addAttachmentsRef.current?.handleUploadAttachments(),
    isDisabled: isAttachmentsUploading,
  };

  const customExtensions = useCustomExtensions({
    placeholder,
    extensions,
    mentions,
    variables,
    isSlashCommandsActive,
    options: [...defaults, ...addons],
    addonCommands,
    onSubmit,
    keyboardShortcuts,
    setMediaUploader,
    setIsEmbedModalOpen,
    isVideoEmbedActive,
    openImageInNewTab,
    openLinkInNewTab,
  });
  useEditorWarnings({ initialValue });

  const editorClasses = classnames("neeto-editor", {
    "slash-active": isSlashCommandsActive && !isPlaceholderActive,
    "fixed-menu-active border": isFixedMenuActive,
    "bubble-menu-active": isBubbleMenuActive,
    "placeholder-active": isPlaceholderActive,
    "attachments-active": isAttachmentsActive,
    [contentClassName]: contentClassName,
  });

  const ariaAttributes = {
    role: "textbox",
    "aria-label": "editor-content",
    "aria-multiline": "true",
    "aria-labelledby": "labelId",
    "aria-required": required,
    "aria-roledescription": "editor",
  };

  const editor = useEditor({
    extensions: customExtensions,
    content: initialValue,
    injectCSS: false,
    autofocus: autoFocus && "end",
    editorProps: {
      attributes: {
        class: editorClasses,
        style: getEditorStyles({ rows }),
        "data-cy": "neeto-editor-content",
        ...ariaAttributes,
        ...contentAttributes,
      },
      clipboardTextParser,
    },
    parseOptions: { preserveWhitespace: true },
    onCreate: ({ editor }) => !autoFocus && setInitialPosition(editor),
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    onFocus,
    onBlur,
  });

  /* Make editor object available to the parent */
  useImperativeHandle(
    ref,
    () => ({ editor, focus: () => editor?.commands?.focus?.() }),
    [editor]
  );

  // https://github.com/ueberdosis/tiptap/issues/1451#issuecomment-953348865
  EditorView.prototype.updateState = function updateState(state) {
    if (!this.docView) return;
    this.updateStateInner(state, this.state.plugins !== state.plugins);
  };

  return (
    <div
      ref={dragDropRef}
      className={classnames({
        [className]: className,
        "ne-attachments__wrapper": isAttachmentsActive,
      })}
    >
      {label && (
        <Label
          {...{ required }}
          className="neeto-ui-mb-2"
          data-cy={`${slugify(label)}-editor-label`}
        >
          {label}
        </Label>
      )}
      <ErrorWrapper {...{ error }} className={errorWrapperClassName}>
        <CharacterCountWrapper
          {...{ editor }}
          isActive={isCharacterCountActive}
        >
          <Menu
            {...{
              addonCommands,
              addons,
              attachmentProps,
              defaults,
              editor,
              editorSecrets,
              isMenuCollapsible,
              mentions,
              menuType,
              openLinkInNewTab,
              tooltips,
              variables,
            }}
            className={menuClassName}
            isIndependant={isMenuIndependent}
          />
          {children}
          <EditorContent {...{ editor, ...otherProps }} />
          {isMediaUploaderActive && (
            <MediaUploader
              {...{ editor, mediaUploader }}
              unsplashApiKey={editorSecrets?.unsplash}
              onClose={() => setMediaUploader({ image: false, video: false })}
            />
          )}
          {isVideoEmbedActive && (
            <EmbedOption
              {...{ editor, isEmbedModalOpen, setIsEmbedModalOpen }}
            />
          )}
          {isAttachmentsActive && (
            <Attachments
              {...{ attachments, dragDropRef }}
              config={attachmentsConfig}
              isIndependent={false}
              ref={addAttachmentsRef}
              setIsUploading={setIsAttachmentsUploading}
              className={classnames("ne-attachments--integrated", {
                [attachmentsClassName]: attachmentsClassName,
              })}
              onChange={onChangeAttachments}
            />
          )}
          {editor?.isActive("link") && <LinkPopOver {...{ editor }} />}
          <TableActionMenu {...{ editor }} appendTo={dragDropRef} />
        </CharacterCountWrapper>
      </ErrorWrapper>
    </div>
  );
};

export default React.forwardRef(Editor);
