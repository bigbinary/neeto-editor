import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useEditor, EditorContent } from "@tiptap/react";
import BubbleMenu from "./CustomExtensions/BubbleMenu";
import FixedMenu from "./CustomExtensions/FixedMenu";
import ImageUploader from "./CustomExtensions/Image/Uploader";
import MarkdownEditor from "./CustomExtensions/Markdown";
import useCustomExtensions from "./CustomExtensions/useCustomExtensions";
import CharacterCount from "./CustomExtensions/CharacterCount";
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

  const isFixedMenuActive = menuType === "fixed";
  const isBubbleMenuActive = menuType === "bubble";
  const isSlashCommandsActive = !hideSlashCommands;
  const isPlaceholderActive = getIsPlaceholderActive(placeholder);
  const showSlashCommandPlaceholder =
    !isPlaceholderActive && isSlashCommandsActive;
  const isUnsplashImageUploadActive = addons.includes("image-upload-unsplash");

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

export default React.forwardRef(Editor);
