import React from "react";
import classNames from "classnames";
import { useEditor, EditorContent } from "@tiptap/react";

import BubbleMenu from "./CustomExtensions/BubbleMenu";
import FixedMenu from "./CustomExtensions/FixedMenu";
import ImageUploader from "./CustomExtensions/Image/Uploader";
import useCustomExtensions from "./CustomExtensions/useCustomExtensions";

const Tiptap = (
  {
    forceTitle = false,
    hideSlashCommands = false,
    hideBubbleMenu = false,
    formatterOptions = [
      "bold",
      "italic",
      "code",
      "highlight",
      "strike",
      "link",
    ],
    className,
    uploadEndpoint,
    initialValue = "",
    onChange = () => {},
    menuType = "fixed",
    variables,
    mentions,
    showImageInMention = false,
    placeholder,
    extensions,
    ...otherProps
  },
  ref
) => {
  const customExtensions = useCustomExtensions({
    forceTitle,
    placeholder,
    extensions,
    mentions,
    variables,
    hideSlashCommands,
    showImageInMention,
  });

  const editor = useEditor({
    extensions: customExtensions,
    content: initialValue,
    injectCSS: false,
    editorProps: {
      attributes: {
        class:
          className ||
          classNames("prose focus:outline-none whitespace-pre-wrap border", {
            "slash-active": !placeholder && !hideSlashCommands,
          }),
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  /* Make editor object available to the parent */
  React.useImperativeHandle(ref, () => ({
    editor: editor,
  }));

  return (
    <>
      {menuType === "fixed" ? (
        <FixedMenu editor={editor} variables={variables} />
      ) : null}
      {menuType === "bubble" ? (
        <BubbleMenu editor={editor} formatterOptions={formatterOptions} />
      ) : null}

      <ImageUploader editor={editor} imageUploadUrl={uploadEndpoint} />
      <EditorContent editor={editor} {...otherProps} />
    </>
  );
};

export default React.forwardRef(Tiptap);
