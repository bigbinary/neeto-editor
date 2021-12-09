import React, { useState } from "react";
import classNames from "classnames";
import { useEditor, EditorContent } from "@tiptap/react";

import BubbleMenu from "./CustomExtensions/BubbleMenu";
import FixedMenu from "./CustomExtensions/FixedMenu";
import ImageUploader from "./CustomExtensions/Image/Uploader";
import MarkdownEditor from "./CustomExtensions/Markdown";
import MarkdownTabSwitcher from "./CustomExtensions/Markdown/TabSwitcher";
import useCustomExtensions from "./CustomExtensions/useCustomExtensions";

const Tiptap = (
  {
    forceTitle = false,
    titleError = false,
    hideSlashCommands = false,
    addons = [],
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
    ...otherProps
  },
  ref
) => {
  const [isImageUploadVisible, setImageUploadVisible] = useState(false);
  const [isMarkdownTab, setIsMarkdownTab] = useState(false);

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
  const allOptions = defaultOptions.concat(
    addons.map((option) => option.toLowerCase())
  );

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
  });

  const editorClasses = classNames(
    "focus:outline-none whitespace-pre-wrap p-3",
    {
      "slash-active": showSlashCommandPlaceholder,
      "fixed-menu-active border": isFixedMenuActive,
      "bubble-menu-active": isBubbleMenuActive,
      [className]: className,
    }
  );

  const editor = useEditor({
    extensions: customExtensions,
    content: initialValue,
    injectCSS: false,
    editorProps: {
      attributes: {
        class: editorClasses,
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  /* Make editor object available to the parent */
  React.useImperativeHandle(ref, () => ({
    editor: editor,
  }));

  return (
    <div className="neeto-editor-wrapper">
      {markdownMode && (
        <MarkdownTabSwitcher
          isMarkdownTab={isMarkdownTab}
          setIsMarkdownTab={setIsMarkdownTab}
        />
      )}
      {isFixedMenuActive && (
        <FixedMenu
          editor={editor}
          variables={variables}
          setImageUploadVisible={setImageUploadVisible}
          options={allOptions}
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
      />
      {isMarkdownTab ? (
        <MarkdownEditor
          editor={editor}
          className={editorClasses}
          {...otherProps}
        />
      ) : (
        <EditorContent editor={editor} {...otherProps} />
      )}
    </div>
  );
};

export default React.forwardRef(Tiptap);
