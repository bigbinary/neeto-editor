import { forwardRef, useImperativeHandle, useState, useRef, memo } from "react";

import { EditorView } from "@tiptap/pm/view";
import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
import classnames from "classnames";
import { EDITOR_OPTIONS, EDITOR_SIZES } from "common/constants";
import { noop, slugify } from "neetocist";
import { useFuncDebounce } from "neetocommons/react-utils";
import { Label } from "neetoui";

import ErrorWrapper from "components/Common/ErrorWrapper";
import useEditorWarnings from "hooks/useEditorWarnings";
import "src/styles/editor/index.scss";

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
    contentWrapperClassName,
    errorWrapperClassName,
    contentAttributes = {},
    menuClassName,
    attachmentsClassName,
    isMenuIndependent = false,
    defaults = DEFAULT_EDITOR_OPTIONS,
    editorSecrets = {},
    error = null,
    extensions = [],
    hideSlashCommands = true,
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
    collaborationProvider = null,
    enableReactNodeViewOptimization = false,
    size = EDITOR_SIZES.SMALL,
    ...otherProps
  },
  ref
) => {
  const [isAttachmentsUploading, setIsAttachmentsUploading] = useState(false);

  const wrapperRef = useRef(null);
  const isAttachmentsActive = addons.includes(EDITOR_OPTIONS.ATTACHMENTS);
  const isVideoEmbedActive = addons.includes(EDITOR_OPTIONS.VIDEO_EMBED);
  const isMediaUploaderActive =
    addons.includes(EDITOR_OPTIONS.IMAGE_UPLOAD) ||
    addons.includes(EDITOR_OPTIONS.VIDEO_UPLOAD);
  const isFixedMenuActive = menuType === "fixed";
  const isBubbleMenuActive = menuType === "bubble";
  const isSlashCommandsActive =
    !hideSlashCommands || (isBubbleMenuActive && !hideSlashCommands);
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

  const debouncedOnChangeHandler = useFuncDebounce(
    ({ editor }) => onChange(editor.getHTML()),
    100
  );

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
    isVideoEmbedActive,
    setMediaUploader,
    setIsEmbedModalOpen,
    openImageInNewTab,
    openLinkInNewTab,
    enableReactNodeViewOptimization,
    collaborationProvider,
  });
  useEditorWarnings({ initialValue });

  const editorClasses = classnames("neeto-editor", {
    "fixed-menu-active border": isFixedMenuActive,
    "bubble-menu-active": isBubbleMenuActive,
    "placeholder-active": isPlaceholderActive,
    "attachments-active": isAttachmentsActive,
    "neeto-editor-size--large": size === EDITOR_SIZES.LARGE,
    "neeto-editor-size--medium": size === EDITOR_SIZES.MEDIUM,
    "neeto-editor-size--small": size === EDITOR_SIZES.SMALL,
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
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
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
    onUpdate: debouncedOnChangeHandler,
    onFocus,
    onBlur,
  });

  useEditorState({
    editor,
    selector: () => ({
      isMediaUploaderActive,
      isLinkActive: editor?.isActive("link"),
    }),
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
      ref={wrapperRef}
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
        <>
          <Menu
            {...{
              addonCommands,
              addons,
              attachmentProps,
              defaults,
              editor,
              editorSecrets,
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
          <EditorContent
            className={contentWrapperClassName}
            {...{ editor, ...otherProps }}
          />
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
              {...{ attachments }}
              config={attachmentsConfig}
              dragDropRef={wrapperRef}
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
          <TableActionMenu {...{ editor }} appendTo={wrapperRef} />
          {isCharacterCountActive && <CharacterCountWrapper {...{ editor }} />}
        </>
      </ErrorWrapper>
    </div>
  );
};

Editor.displayName = "NeetoEditor";

export default memo(forwardRef(Editor));
