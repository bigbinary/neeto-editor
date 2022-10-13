import CharacterCount from "@tiptap/extension-character-count";
import Code from "@tiptap/extension-code";
import Focus from "@tiptap/extension-focus";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";

import { isNilOrEmpty } from "utils/common";

import CodeBlock from "./CodeBlock/ExtensionConfig";
import CustomCommands from "./CustomCommands/ExtensionConfig";
import Document from "./Document/ExtensionConfig";
import Embeds from "./Embeds/ExtensionConfig";
import EmojiPicker from "./Emoji/EmojiPicker/ExtensionConfig";
import EmojiSuggestion from "./Emoji/EmojiSuggestion/ExtensionConfig";
import ImageExtension from "./Image/ExtensionConfig";
import FigCaption from "./Image/FigCaption";
import KeyboardShortcuts from "./KeyboardShortcuts/ExtensionConfig";
import Mention, { createMentionSuggestions } from "./Mention/ExtensionConfig";
import Placeholder, {
  placeholderGenerator,
} from "./Placeholder/ExtensionConfig";
import SlashCommands from "./SlashCommands/ExtensionConfig";
import Title from "./Title/ExtensionConfig";
import Variable from "./Variable/ExtensionConfig";

const useCustomExtensions = ({
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
  onSubmit,
  keyboardShortcuts,
  uploadEndpoint,
}) => {
  let customExtensions = [
    Title,
    Document.extend({
      content: forceTitle ? "title block*" : "block+",
    }),
    StarterKit.configure({
      document: false,
      codeBlock: false,
      code: false,
    }),
    Code,
    Underline,
    Highlight,
    CodeBlock,
    ImageExtension.configure({ uploadEndpoint }),
    FigCaption,
    Embeds,
    Link,
    Focus.configure({ mode: "shallowest" }),
    Placeholder.configure({
      placeholder: placeholderGenerator(placeholder),
    }),
    EmojiSuggestion,
    EmojiPicker,
    CustomCommands,
    CharacterCount.configure({
      limit: characterLimit,
    }),
    KeyboardShortcuts.configure({
      handleSubmit: onSubmit,
      shortcuts: keyboardShortcuts,
    }),
  ];

  if (isSlashCommandsActive) {
    customExtensions.push(
      SlashCommands.configure({
        setImageUploadVisible,
        options,
        addonCommands,
      })
    );
  }

  if (!isNilOrEmpty(mentions)) {
    customExtensions.push(
      Mention.configure({
        suggestion: {
          items: createMentionSuggestions(mentions, showImageInMention),
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
};

export default useCustomExtensions;
