import StarterKit from "@tiptap/starter-kit";
import Typography from "@tiptap/extension-typography";
import Highlight from "@tiptap/extension-highlight";
import Dropcursor from "@tiptap/extension-dropcursor";
import CharacterCount from "@tiptap/extension-character-count";
import Link from "@tiptap/extension-link";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";

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
import Embeds from "./Embeds/ExtensionConfig";
import EmojiSuggestion from "./Emoji/EmojiSuggestion/ExtensionConfig";
import EmojiPicker from "./Emoji/EmojiPicker/ExtensionConfig";
import KeyboardShortcuts from "./KeyboardShortcuts/ExtensionConfig";
import { isNilOrEmpty } from "utils/common";

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
  addonCommands,
  characterLimit,
  keyboardShortcuts,
}) {
  let customExtensions = [
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
    KeyboardShortcuts.configure(keyboardShortcuts),
  ];

  if (isSlashCommandsActive) {
    customExtensions.push(
      SlashCommands.configure({
        setImageUploadVisible,
        options,
        addonCommands,
        mentions,
      })
    );
  }

  if (!isNilOrEmpty(mentions)) {
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

  if (!isNilOrEmpty(variables)) {
    customExtensions.push(
      Variable.configure({ suggestion: { items: () => variables } })
    );
  }

  if (!isNilOrEmpty(extensions)) {
    customExtensions = customExtensions.concat(extensions);
  }

  return customExtensions;
}
