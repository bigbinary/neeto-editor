import React, { useImperativeHandle, useState, useRef } from "react";

import { useEditor, EditorContent } from "@tiptap/react";
import classnames from "classnames";
import { Label } from "neetoui";
import { EditorView } from "prosemirror-view";

import { DIRECT_UPLOAD_ENDPOINT, EDITOR_OPTIONS } from "common/constants";
import ErrorWrapper from "components/Common/ErrorWrapper";
import useEditorWarnings from "hooks/useEditorWarnings";
import { noop, slugify } from "neetocommons/pure";

import { DEFAULT_EDITOR_OPTIONS } from "./constants";
import CharacterCountWrapper from "./CustomExtensions/CharacterCount";
import useCustomExtensions from "./CustomExtensions/useCustomExtensions";
import EmbedOption from "./EmbedOption";
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
    initialValue = "",
    menuType = "fixed",
    label = "",
    required = false,
    autoFocus = false,
    hideSlashCommands = false,
    defaults = DEFAULT_EDITOR_OPTIONS,
    addons = [],
    addonCommands = [],
    tooltips = {},
    className,
    contentClassName,
    uploadEndpoint = DIRECT_UPLOAD_ENDPOINT,
    onChange = noop,
    onFocus = noop,
    onBlur = noop,
    onSubmit = noop,
    variables = [],
    mentions = [],
    placeholder,
    extensions = [],
    editorSecrets = {},
    rows = 6,
    isCharacterCountActive = false,
    keyboardShortcuts = [],
    error = null,
    config = {},
    attachments = [],
    onChangeAttachments = noop,
    ...otherProps
  },
  ref
) => {
  const dragDropRef = useRef(null);
  const isAttachmentsActive = addons.includes(EDITOR_OPTIONS.ATTACHMENTS);
  const isVideoEmbedActive = addons.includes(EDITOR_OPTIONS.VIDEO_EMBED);
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
    uploadEndpoint,
    config,
    setMediaUploader,
    setIsEmbedModalOpen,
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

  const editor = useEditor({
    extensions: customExtensions,
    content: initialValue,
    injectCSS: false,
    autofocus: autoFocus && "end",
    editorProps: {
      attributes: {
        class: editorClasses,
        style: getEditorStyles({ rows }),
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
  useImperativeHandle(ref, () => ({ editor }));

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
          required={required}
        >
          {label}
        </Label>
      )}
      <ErrorWrapper error={error} isFixedMenuActive={isFixedMenuActive}>
        <CharacterCountWrapper
          editor={editor}
          isActive={isCharacterCountActive}
        >
          <Menu
            addonCommands={addonCommands}
            addons={addons}
            defaults={defaults}
            editor={editor}
            editorSecrets={editorSecrets}
            handleUploadAttachments={handleUploadAttachments}
            isIndependant={false}
            mentions={mentions}
            menuType={menuType}
            tooltips={tooltips}
            uploadEndpoint={uploadEndpoint}
            variables={variables}
          />
          <EditorContent editor={editor} {...otherProps} />
          <MediaUploader
            editor={editor}
            mediaUploader={mediaUploader}
            unsplashApiKey={editorSecrets.unsplash}
            uploadEndpoint={uploadEndpoint}
            onClose={() => setMediaUploader({ image: false, video: false })}
          />
          {isVideoEmbedActive && (
            <EmbedOption
              editor={editor}
              isEmbedModalOpen={isEmbedModalOpen}
              setIsEmbedModalOpen={setIsEmbedModalOpen}
            />
          )}
          {isAttachmentsActive && (
            <Attachments
              attachments={attachments}
              className="ne-attachments--integrated"
              dragDropRef={dragDropRef}
              isIndependent={false}
              ref={addAttachmentsRef}
              onChange={onChangeAttachments}
            />
          )}
        </CharacterCountWrapper>
      </ErrorWrapper>
    </div>
  );
};

export default React.forwardRef(Editor);
