import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Typography from "@tiptap/extension-typography";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import Dropcursor from "@tiptap/extension-dropcursor";
import Link from "@tiptap/extension-link";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";

import ImageExtension from "./CustomExtensions/Image/ExtensionConfig";
import SlashCommands from "./CustomExtensions/SlashCommands/ExtensionConfig";
import CodeBlock from "./CustomExtensions/CodeBlock/ExtensionConfig";
import ImageUploader from "./CustomExtensions/Image/Uploader";
import BubbleMenu from "./CustomExtensions/BubbleMenu";
import Embeds from "./CustomExtensions/Embeds";
import FixedMenu from "./CustomExtensions/FixedMenu";

import "./styles/EditorStyles.scss";

const Tiptap = (
  {
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
    ...otherProps
  },
  ref
) => {
  let extensions;
  if (otherProps.extensions) {
    extensions = otherProps.extensions;
  } else {
    extensions = [
      StarterKit,
      Typography,
      TextStyle,
      Highlight,
      Placeholder,
      CodeBlock,
      ImageExtension,
      Dropcursor,
      Embeds,
      Link,
      Color,
    ];
  }

  if (!hideSlashCommands) {
    extensions = [...extensions, SlashCommands];
  }

  const editor = useEditor({
    extensions,
    content: initialValue,
    injectCSS: false,
    editorProps: {
      attributes: {
        class: className || "prose focus:outline-none whitespace-pre-wrap",
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
      {menuType === "fixed" ? <FixedMenu editor={editor} /> : null}
      {menuType === "bubble" ? (
        <BubbleMenu editor={editor} formatterOptions={formatterOptions} />
      ) : null}

      <ImageUploader editor={editor} imageUploadUrl={uploadEndpoint} />
      <EditorContent editor={editor} />
    </>
  );
};

export default React.forwardRef(Tiptap);
