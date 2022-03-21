import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { useEditor, EditorContent } from "@tiptap/react";

import { stringifyObject } from "utils/common";

import BubbleMenu from "./CustomExtensions/BubbleMenu";
import FixedMenu from "./CustomExtensions/FixedMenu";
import ImageUploader from "./CustomExtensions/Image/Uploader";
import MarkdownEditor from "./CustomExtensions/Markdown";
import CharacterCount from "./CustomExtensions/CharacterCount";
import useMarkdownEditor from "./CustomExtensions/Markdown/useMarkdownEditor";
import useCustomExtensions from "./CustomExtensions/useCustomExtensions";

import {
  generateAddonOptions,
  getEditorStyles,
  getIsPlaceholderActive,
} from "./helpers";

const Editor = (
  {
    forceTitle = false,
    titleError = false,
    hideSlashCommands = false,
    addons = [],
    addonCommands,
    markdownMode = false,
    className,
    uploadEndpoint,
    initialValue = "",
    onChange = () => {},
    menuType = "fixed",
    variables,
    mentions,
    showImageInMention = false,
    placeholder = forceTitle ? { title: "Untitled" } : null,
    extensions,
    contentClassName,
    characterLimit,
    editorSecrets,
    rows = 6,
    autoFocus = false,
    onSubmit,
    heightStrategy = "fixed",
    characterCountStrategy = "hidden",
    ...otherProps
  },
  ref
) => {
  const [isImageUploadVisible, setImageUploadVisible] = useState(false);

  const isFixedMenuActive = !markdownMode && menuType === "fixed";
  const isBubbleMenuActive = !markdownMode && menuType === "bubble";
  const isSlashCommandsActive = !markdownMode && !hideSlashCommands;
  const isPlaceholderActive = getIsPlaceholderActive(placeholder);
  const showSlashCommandPlaceholder =
    !isPlaceholderActive && isSlashCommandsActive;
  const isUnsplashImageUploadActive = addons.includes("image-upload-unsplash");
  const isCharacterCountActive =
    !markdownMode && characterCountStrategy !== "hidden";

  const addonOptions = generateAddonOptions(addons, {
    includeImageUpload: isUnsplashImageUploadActive,
  });

  const customExtensions = useCustomExtensions({
    contentClassName,
    forceTitle,
    placeholder,
    extensions,
    mentions,
    variables,
    isSlashCommandsActive,
    showImageInMention,
    setImageUploadVisible,
    options: addonOptions,
    addonCommands,
    characterLimit,
    onSubmit,
  });

  const editorClasses = classNames("neeto-editor", {
    "slash-active": showSlashCommandPlaceholder,
    "fixed-menu-active border": isFixedMenuActive,
    "bubble-menu-active": isBubbleMenuActive,
    "force-title": forceTitle,
    "force-title--error": titleError,
    "placeholder-active": isPlaceholderActive,
    [className]: className,
  });

  const editorStyles = getEditorStyles({ heightStrategy, rows });

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
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  const markdownEditor = useMarkdownEditor({
    content: initialValue,
    onUpdate: ({ html }) => onChange(html),
    onSubmit: ({ html }) => onSubmit && onSubmit(html),
  });

  /* Make editor object available to the parent */
  React.useImperativeHandle(ref, () => ({
    editor: markdownMode ? markdownEditor : editor,
  }));

  useEffect(() => {
    if (!editor) return;
    const nextContent = markdownMode
      ? editor.getHTML()
      : markdownEditor.getHTML();
    const nextContentUpdater = markdownMode
      ? markdownEditor.commands.setContent
      : editor.commands.setContent;
    nextContentUpdater(nextContent);
  }, [markdownMode]);

  return (
    <div className="neeto-editor-wrapper">
      {isFixedMenuActive && (
        <FixedMenu
          editor={editor}
          variables={variables}
          setImageUploadVisible={setImageUploadVisible}
          options={addonOptions}
          mentions={mentions}
          showImageInMention={showImageInMention}
        />
      )}
      {isBubbleMenuActive && (
        <BubbleMenu editor={editor} options={addonOptions} />
      )}
      <ImageUploader
        isVisible={isImageUploadVisible}
        setIsVisible={setImageUploadVisible}
        editor={editor}
        imageUploadUrl={uploadEndpoint}
        isUnsplashImageUploadActive={isUnsplashImageUploadActive}
        unsplashApiKey={editorSecrets?.unsplash}
      />
      {markdownMode && (
        <MarkdownEditor
          editor={markdownEditor}
          strategy={heightStrategy}
          style={editorStyles}
          limit={characterLimit}
          className={editorClasses}
          {...otherProps}
        />
      )}
      <div
        className={classNames({ "neeto-editor-content--hidden": markdownMode })}
      >
        <EditorContent editor={editor} {...otherProps} />
      </div>

      {isCharacterCountActive && (
        <CharacterCount
          count={editor?.storage.characterCount.characters()}
          limit={characterLimit}
          strategy={characterCountStrategy}
        />
      )}
    </div>
  );
};

export default React.forwardRef(Editor);
