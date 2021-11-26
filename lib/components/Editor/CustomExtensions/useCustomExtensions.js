import StarterKit from "@tiptap/starter-kit";
import Typography from "@tiptap/extension-typography";
import Highlight from "@tiptap/extension-highlight";
import Dropcursor from "@tiptap/extension-dropcursor";
import Link from "@tiptap/extension-link";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import isEmpty from "lodash.isempty";

import Document from "./Document/ExtensionConfig";
import Root from "./Root/ExtensionConfig";
import ImageExtension from "./Image/ExtensionConfig";
import Underline from "@tiptap/extension-underline";
import SlashCommands from "./SlashCommands/ExtensionConfig";
import CodeBlock from "./CodeBlock/ExtensionConfig";
import Variable from "./Variable/ExtensionConfig";
import Placeholder, {
  placeholderGenerator,
} from "./Placeholder/ExtensionConfig";
import Mention, { createMentionSuggestions } from "./Mention/ExtensionConfig";
import Embeds from "./Embeds";

export default function useCustomExtensions({
  contentClassName,
  forceTitle,
  placeholder,
  extensions,
  mentions,
  variables,
  isSlashCommandsActive,
  showImageInMention,
  setImageUploadVisible,
}) {
  let customExtensions;

  if (extensions) {
    customExtensions = [...extensions];
  } else {
    customExtensions = [
      Document,
      Root.extend({
        content: forceTitle ? "heading block*" : "block+",
      }).configure({ HTMLAttributes: { class: contentClassName } }),
      StarterKit.configure({
        document: false,
        codeBlock: false,
      }),
      Underline,
      Typography,
      TextStyle,
      Highlight,
      CodeBlock,
      ImageExtension,
      Dropcursor,
      Embeds,
      Link,
      Color,
      Placeholder.configure({
        includeChildren: true,
        placeholder: placeholderGenerator(placeholder),
      }),
    ];

    if (isSlashCommandsActive) {
      customExtensions.push(SlashCommands.configure({ setImageUploadVisible }));
    }

    if (!isEmpty(mentions)) {
      customExtensions.push(
        Mention.configure({
          suggestion: {
            items: createMentionSuggestions(mentions, {
              showImage: showImageInMention,
            }),
          },
        })
      );
    }

    if (!isEmpty(variables)) {
      customExtensions.push(
        Variable.configure({ suggestion: { items: () => variables } })
      );
    }
  }

  return customExtensions;
}
