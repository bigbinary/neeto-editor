import React, { useState, useEffect } from "react";

import { useEditor, EditorContent } from "@tiptap/react";
import classNames from "classnames";
import { EditorView } from "prosemirror-view";

import { DIRECT_UPLOAD_ENDPOINT } from "common/constants";
import ErrorWrapper from "components/Common/ErrorWrapper";
import { isNilOrEmpty, noop } from "utils/common";

import { DEFAULT_EDITOR_OPTIONS } from "./constants";
import BubbleMenu from "./CustomExtensions/BubbleMenu";
import CharacterCount from "./CustomExtensions/CharacterCount";
import FixedMenu from "./CustomExtensions/FixedMenu";
import ImageUploader from "./CustomExtensions/Image/Uploader";
import useCustomExtensions from "./CustomExtensions/useCustomExtensions";
import {
  generateAddonOptions,
  getEditorStyles,
  clipboardTextParser,
  setInitialPosition,
  stringifyObject,
} from "./utils";

const Editor = (
  {
    initialValue = "",
    menuType = "fixed",
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
    characterLimit,
    editorSecrets = {},
    rows = 6,
    autoFocus = false,
    characterCountStrategy = "hidden",
    keyboardShortcuts = [],
    error = null,
    ...otherProps
  },
  ref
) => {
  const [isImageUploadVisible, setIsImageUploadVisible] = useState(false);

  const isFixedMenuActive = menuType === "fixed";
  const isBubbleMenuActive = menuType === "bubble";
  const isSlashCommandsActive = !hideSlashCommands;
  const isPlaceholderActive = !!placeholder;
  const showSlashCommandPlaceholder =
    !isPlaceholderActive && isSlashCommandsActive;
  const isUnsplashImageUploadActive = addons.includes("image-upload-unsplash");
  const isCharacterCountActive = characterCountStrategy !== "hidden";

  const addonOptions = generateAddonOptions(defaults, addons, {
    includeImageUpload: isUnsplashImageUploadActive,
  });

  const customExtensions = useCustomExtensions({
    placeholder,
    extensions,
    mentions,
    variables,
    isSlashCommandsActive,
    setIsImageUploadVisible,
    options: addonOptions,
    addonCommands,
    characterLimit,
    keyboardShortcuts,
    onSubmit,
    uploadEndpoint,
  });

  // https://github.com/ueberdosis/tiptap/issues/1451#issuecomment-953348865
  EditorView.prototype.updateState = function updateState(state) {
    if (!this.docView) return;
    this.updateStateInner(state, this.state.plugins !== state.plugins);
  };

  const editorClasses = classNames("neeto-editor", {
    "slash-active": showSlashCommandPlaceholder,
    "fixed-menu-active border": isFixedMenuActive,
    "bubble-menu-active": isBubbleMenuActive,
    "placeholder-active": isPlaceholderActive,
    [className]: className,
  });

  const editorStyles = getEditorStyles({ rows });

  const editor = useEditor({
    extensions: customExtensions,
    content: initialValue,
    injectCSS: false,
    autofocus: autoFocus && "end",
    editorProps: {
      attributes: {
        class: editorClasses,
        style: stringifyObject(editorStyles),
      },
      clipboardTextParser,
    },
    parseOptions: {
      preserveWhitespace: true,
    },
    onCreate: ({ editor }) => !autoFocus && setInitialPosition(editor),
    onUpdate: ({ editor }) => setTimeout(() => onChange(editor.getHTML()), 0),
    onFocus,
    onBlur,
  });

  /* Make editor object available to the parent */
  React.useImperativeHandle(ref, () => ({ editor }));

  useEffect(() => {
    const isProduction = [process.env.RAILS_ENV, process.env.NODE_ENV].includes(
      "production"
    );
    if (!isProduction && isNilOrEmpty(initialValue)) {
      // eslint-disable-next-line no-console
      console.warn(
        `[neeto-editor]: Empty value of "initialValue" in needtoEditor is expected to be "<p></p>" instead of "${initialValue}".`
      );
    }
  }, [initialValue]);

  return (
    <ErrorWrapper error={error} isFixedMenuActive={isFixedMenuActive}>
      {isFixedMenuActive && (
        <FixedMenu
          editor={editor}
          mentions={mentions}
          options={addonOptions}
          setIsImageUploadVisible={setIsImageUploadVisible}
          variables={variables}
        />
      )}
      {isBubbleMenuActive && (
        <BubbleMenu
          editor={editor}
          mentions={mentions}
          options={addonOptions}
        />
      )}
      <ImageUploader
        editor={editor}
        imageUploadUrl={uploadEndpoint}
        isUnsplashImageUploadActive={isUnsplashImageUploadActive}
        isVisible={isImageUploadVisible}
        setIsVisible={setIsImageUploadVisible}
        unsplashApiKey={editorSecrets.unsplash}
        uploadConfig={uploadConfig}
      />
      <EditorContent editor={editor} {...otherProps} />
      {isCharacterCountActive && (
        <CharacterCount
          count={editor?.storage.characterCount.characters()}
          limit={characterLimit}
          strategy={characterCountStrategy}
        />
      )}
    </ErrorWrapper>
  );
};

export default React.forwardRef(Editor);
