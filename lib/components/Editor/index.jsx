import React, { useImperativeHandle, useState } from "react";

import { useEditor, EditorContent } from "@tiptap/react";
import classnames from "classnames";
import { EditorView } from "prosemirror-view";

import { DIRECT_UPLOAD_ENDPOINT } from "common/constants";
import ErrorWrapper from "components/Common/ErrorWrapper";
import useEditorWarnings from "hooks/useEditorWarnings";
import { noop } from "utils/common";

import { DEFAULT_EDITOR_OPTIONS } from "./constants";
import CharacterCountWrapper from "./CustomExtensions/CharacterCount";
import ImageUploader from "./CustomExtensions/Image/Uploader";
import useCustomExtensions from "./CustomExtensions/useCustomExtensions";
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
    autoFocus = false,
    hideSlashCommands = false,
    defaults = DEFAULT_EDITOR_OPTIONS,
    addons = [],
    addonCommands = [],
    className,
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
  const [isImageUploaderOpen, setIsImageUploaderOpen] = useState(false);

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
    openImageUploader: () => setIsImageUploaderOpen(true),
  });
  useEditorWarnings({ initialValue });

  /* Make editor object available to the parent */
  useImperativeHandle(ref, () => ({ editor }));

  const editorClasses = classnames("neeto-editor", {
    "slash-active": isSlashCommandsActive && !isPlaceholderActive,
    "fixed-menu-active border": isFixedMenuActive,
    "bubble-menu-active": isBubbleMenuActive,
    "placeholder-active": isPlaceholderActive,
    [className]: className,
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

  // https://github.com/ueberdosis/tiptap/issues/1451#issuecomment-953348865
  EditorView.prototype.updateState = function updateState(state) {
    if (!this.docView) return;
    this.updateStateInner(state, this.state.plugins !== state.plugins);
  };

  return (
    <div className={classnames({ [className]: className })}>
      <ErrorWrapper error={error} isFixedMenuActive={isFixedMenuActive}>
        <CharacterCountWrapper
          editor={editor}
          isActive={isCharacterCountActive}
        >
          <Menu
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
            imageUploadUrl={uploadEndpoint}
            isOpen={isImageUploaderOpen}
            unsplashApiKey={editorSecrets.unsplash}
            uploadConfig={uploadConfig}
            onClose={() => setIsImageUploaderOpen(false)}
          />
        </CharacterCountWrapper>
      </ErrorWrapper>
    </div>
  );
};

export default React.forwardRef(Editor);
