import React from "react";
import classNames from "classnames";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Typography from "@tiptap/extension-typography";
import Highlight from "@tiptap/extension-highlight";
import Dropcursor from "@tiptap/extension-dropcursor";
import Link from "@tiptap/extension-link";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";

import ImageExtension from "./CustomExtensions/Image/ExtensionConfig";
import SlashCommands from "./CustomExtensions/SlashCommands/ExtensionConfig";
import CodeBlock from "./CustomExtensions/CodeBlock/ExtensionConfig";
import Variable from "./CustomExtensions/Variable/ExtensionConfig";
import Placeholder from "./CustomExtensions/Placeholder/ExtensionConfig";
import Mention from "./CustomExtensions/Mention/ExtensionConfig";
import BubbleMenu from "./CustomExtensions/BubbleMenu";
import Embeds from "./CustomExtensions/Embeds";
import FixedMenu from "./CustomExtensions/FixedMenu";
import ImageUploader from "./CustomExtensions/Image/Uploader";

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
    variables,
    mentions,
    showImageInMention = false,
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
      CodeBlock,
      ImageExtension,
      Dropcursor,
      Embeds,
      Link,
      Color,
      Placeholder,
    ];
  }

  if (!hideSlashCommands) {
    extensions = [...extensions, SlashCommands];
  }

  if (mentions && mentions.length) {
    extensions = [
      ...extensions,
      Mention.configure({
        suggestion: {
          items: Mention.createSuggestionItems(mentions, {
            showImage: showImageInMention,
          }),
          allow: () => true,
        },
      }),
    ];
  }

  if (variables && variables.length) {
    extensions = [
      ...extensions,
      Variable.configure({ suggestion: { items: () => variables } }),
    ];
  }

  const editor = useEditor({
    extensions,
    content: initialValue,
    injectCSS: false,
    editorProps: {
      attributes: {
        class:
          className ||
          classNames("prose focus:outline-none whitespace-pre-wrap border", {
            "slash-active": !hideSlashCommands,
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
      <EditorContent editor={editor} />
    </>
  );
};

export default React.forwardRef(Tiptap);
