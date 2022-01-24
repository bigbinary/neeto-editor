import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useEditor, EditorContent } from "@tiptap/react";

import { EDITOR_PADDING_SIZE, EDITOR_LINE_HEIGHT } from "constants/common";

import BubbleMenu from "./CustomExtensions/BubbleMenu";
import FixedMenu from "./CustomExtensions/FixedMenu";
import ImageUploader from "./CustomExtensions/Image/Uploader";
import MarkdownEditor from "./CustomExtensions/Markdown";
import useCustomExtensions from "./CustomExtensions/useCustomExtensions";
import CharacterCount from "./CustomExtensions/CharacterCount";
import { EDITOR_BORDER_SIZE } from "../../constants/common";

const Tiptap = (
  {
    forceTitle = false,
    titleError = false,
    hideSlashCommands = false,
    addons = [],
    markdownMode = false,
    className,
    uploadEndpoint,
    value = "",
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

  let isPlaceholderActive = false;
  if (placeholder) {
    const placeholderKeysLength = Object.keys(placeholder).length;
    isPlaceholderActive =
      typeof placeholder === "string" ||
      (placeholderKeysLength === 1
        ? !placeholder.title
        : !!placeholderKeysLength);
  }

  const isFixedMenuActive = menuType === "fixed";
  const isBubbleMenuActive = menuType === "bubble";
  const isSlashCommandsActive = !hideSlashCommands;
  const showSlashCommandPlaceholder =
    !isPlaceholderActive && isSlashCommandsActive;
  const isUnsplashImageUploadActive = addons.includes("image-upload-unsplash");

  const defaultOptions = [
    "font-color",
    "font-size",
    "bold",
    "italic",
    "underline",
    "strike",
    "link",
    "bullet-list",
    "ordered-list",
  ];
  const addonOptions = addons.map((option) => option.toLowerCase());
  isUnsplashImageUploadActive && addonOptions.push("image-upload");
  const allOptions = defaultOptions.concat(addonOptions);

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
    options: allOptions,
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

  const editorHeightAttrName =
    heightStrategy === "flexible" ? "min-height" : "height";
  const editorHeightAttrValue =
    rows * EDITOR_LINE_HEIGHT + 2 * (EDITOR_PADDING_SIZE + EDITOR_BORDER_SIZE);

  const editorStyles = `
    ${editorHeightAttrName}: ${editorHeightAttrValue}px;
  `;

  const editor = useEditor({
    extensions: customExtensions,
    content: value,
    injectCSS: false,
    editorProps: {
      attributes: {
        class: editorClasses,
        style: editorStyles,
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  useEffect(() => {
    autoFocus && editor?.commands.focus("end");
  }, [editor]);

  useEffect(() => {
    typeof value === "string"
      ? editor?.commands.setContent(value)
      : editor?.commands.setContent("");
  }, [value]);

  /* Make editor object available to the parent */
  React.useImperativeHandle(ref, () => ({
    editor: editor,
  }));

  return (
    <div className="neeto-editor-wrapper">
      {isFixedMenuActive && (
        <FixedMenu
          editor={editor}
          variables={variables}
          setImageUploadVisible={setImageUploadVisible}
          options={allOptions}
          mentions={mentions}
          showImageInMention={showImageInMention}
        />
      )}
      {isBubbleMenuActive && (
        <BubbleMenu editor={editor} options={allOptions} />
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
          editor={editor}
          strategy={heightStrategy}
          style={editorStyles}
          className={editorClasses}
          onChange={onChange}
          onSubmit={onSubmit}
          initialValue={initialValue}
          {...otherProps}
        />
      )}
      <div
        className={classNames({ "neeto-editor-content--hidden": markdownMode })}
      >
        <EditorContent editor={editor} {...otherProps} />
      </div>
      <CharacterCount
        editor={editor}
        limit={characterLimit}
        strategy={characterCountStrategy}
      />
    </div>
  );
};

export default React.forwardRef(Tiptap);
