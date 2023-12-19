import React, { useImperativeHandle, useState, useRef } from "react";

import { useEditor, EditorContent } from "@tiptap/react";
import classnames from "classnames";
import { noop, slugify } from "neetocist";
import { useFuncDebounce } from "neetocommons/react-utils";
import { Label } from "neetoui";
import { EditorView } from "prosemirror-view";

import { EDITOR_OPTIONS } from "common/constants";
import ErrorWrapper from "components/Common/ErrorWrapper";
import useEditorWarnings from "hooks/useEditorWarnings";

import { DEFAULT_EDITOR_OPTIONS } from "./constants";
import CharacterCountWrapper from "./CustomExtensions/CharacterCount";
import EmbedOption from "./CustomExtensions/Embeds";
import useCustomExtensions from "./CustomExtensions/hooks/useCustomExtensions";
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
    showAttachmentsToastr = true,
    openImageInNewTab = true,
    openLinkInNewTab = true,
    ...otherProps
  },
  ref
) => {
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
  const handleUploadAttachments = () =>
    addAttachmentsRef.current?.handleUploadAttachments() || noop();

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

  const handleChange = useFuncDebounce(
    ({ editor }) => onChange(editor.getHTML()),
    100
  );

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
    onUpdate: handleChange,
    onFocus,
    onBlur,
  });

  /* Make editor object available to the parent */
  useImperativeHandle(ref, () => ({
    editor,
    focus: () => editor?.commands?.focus?.(),
  }));

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
          className="neeto-ui-mb-2"
          data-cy={`${slugify(label)}-editor-label`}
          {...{ required }}
        >
          {label}
        </Label>
      )}
      <ErrorWrapper className={errorWrapperClassName} {...{ error }}>
        <CharacterCountWrapper
          {...{ editor }}
          isActive={isCharacterCountActive}
        >
          <Menu
            className={menuClassName}
            {...{
              addonCommands,
              addons,
              defaults,
              editor,
              editorSecrets,
              handleUploadAttachments,
              isMenuCollapsible,
              mentions,
              menuType,
              tooltips,
              variables,
            }}
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
              showToastr={showAttachmentsToastr}
              className={classnames("ne-attachments--integrated", {
                [attachmentsClassName]: attachmentsClassName,
              })}
              onChange={onChangeAttachments}
            />
          )}
          {editor?.isActive("link") && <LinkPopOver {...{ editor }} />}
        </CharacterCountWrapper>
      </ErrorWrapper>
    </div>
  );
};

export default React.forwardRef(Editor);
