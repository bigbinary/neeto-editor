import React, { useImperativeHandle, useState } from "react";

import { useEditor, EditorContent } from "@tiptap/react";
import classnames from "classnames";
import { EditorView } from "prosemirror-view";

import { DIRECT_UPLOAD_ENDPOINT } from "common/constants";
import ErrorWrapper from "components/Common/ErrorWrapper";
import Label from "components/Common/Label";
import useEditorWarnings from "hooks/useEditorWarnings";
import { noop, slugify } from "utils/common";

import { DEFAULT_EDITOR_OPTIONS } from "./constants";
import CharacterCountWrapper from "./CustomExtensions/CharacterCount";
import useCustomExtensions from "./CustomExtensions/useCustomExtensions";
import ImageUploader from "./MediaUploader";
import Menu from "./Menu";
import {
  getEditorStyles,
  clipboardTextParser,
  setInitialPosition,
} from "./utils";

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
    className,
    contentClassName,
    uploadEndpoint = DIRECT_UPLOAD_ENDPOINT,
    uploadConfig = {},
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
    ...otherProps
  },
  ref
) => {
  const isFixedMenuActive = menuType === "fixed";
  const isBubbleMenuActive = menuType === "bubble";
  const isSlashCommandsActive = !hideSlashCommands;
  const isPlaceholderActive = !!placeholder;
  const [mediaUploader, setMediaUploader] = useState({
    image: false,
    video: false,
  });

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
  });
  useEditorWarnings({ initialValue });

  const editorClasses = classnames("neeto-editor", {
    "slash-active": isSlashCommandsActive && !isPlaceholderActive,
    "fixed-menu-active border": isFixedMenuActive,
    "bubble-menu-active": isBubbleMenuActive,
    "placeholder-active": isPlaceholderActive,
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
    <div className={classnames({ [className]: className })}>
      {label && (
        <Label data-cy={`${slugify(label)}-editor-label`} required={required}>
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
            isIndependant={false}
            mentions={mentions}
            menuType={menuType}
            uploadConfig={uploadConfig}
            uploadEndpoint={uploadEndpoint}
            variables={variables}
          />
          <EditorContent editor={editor} {...otherProps} />
          <ImageUploader
            editor={editor}
            mediaUploader={mediaUploader}
            unsplashApiKey={editorSecrets.unsplash}
            uploadConfig={uploadConfig}
            uploadEndpoint={uploadEndpoint}
            onClose={() => setMediaUploader({ image: false, video: false })}
          />
        </CharacterCountWrapper>
      </ErrorWrapper>
    </div>
  );
};

export default React.forwardRef(Editor);
