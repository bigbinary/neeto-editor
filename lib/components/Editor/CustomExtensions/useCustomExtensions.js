import StarterKit from "@tiptap/starter-kit";
import Typography from "@tiptap/extension-typography";
import Highlight from "@tiptap/extension-highlight";
import Dropcursor from "@tiptap/extension-dropcursor";
import CharacterCount from "@tiptap/extension-character-count";
import Link from "@tiptap/extension-link";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import isEmpty from "lodash.isempty";

import Document from "./Document/ExtensionConfig";
import Title from "./Title/ExtensionConfig";
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
import EmojiSuggestion from "./Emoji/EmojiSuggestion/ExtensionConfig";
import EmojiPicker from "./Emoji/EmojiPicker/ExtensionConfig";

export default function useCustomExtensions({
  forceTitle,
  placeholder,
  extensions,
  mentions,
  variables,
  isSlashCommandsActive,
  showImageInMention,
  setImageUploadVisible,
  options,
  characterLimit,
}) {
  let customExtensions;

  if (extensions) {
    customExtensions = [...extensions];
  } else {
    customExtensions = [
      Title,
      Document.extend({
        content: forceTitle ? "title block*" : "block+",
      }),
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
        placeholder: placeholderGenerator(placeholder),
      }),
      EmojiSuggestion,
      EmojiPicker,
      CharacterCount.configure({
        limit: characterLimit,
      }),
    ];

    if (isSlashCommandsActive) {
      customExtensions.push(
        SlashCommands.configure({ setImageUploadVisible, options })
      );
    }

    if (!isEmpty(mentions)) {
      customExtensions.push(
        Mention.configure({
          suggestion: {
            items: createMentionSuggestions(
              mentions.sort((mention1, mention2) => {
                const name1 =
                  typeof mention1 === "string" ? mention1 : mention1.label;
                const name2 =
                  typeof mention2 === "string" ? mention2 : mention2.label;
                return name1.localeCompare(name2);
              }),
              {
                showImage: showImageInMention,
              }
            ),
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
