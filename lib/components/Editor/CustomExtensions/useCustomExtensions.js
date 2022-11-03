import CharacterCount from "@tiptap/extension-character-count";
import Code from "@tiptap/extension-code";
import Focus from "@tiptap/extension-focus";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import { isEmpty } from "ramda";

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
  placeholder,
  extensions,
  mentions,
  variables,
  isSlashCommandsActive,
  showImageInMention,
  setIsImageUploadVisible,
  options,
  addonCommands,
  characterLimit,
  onSubmit,
  keyboardShortcuts,
  uploadEndpoint,
}) => {
  let customExtensions = [
    Document,
    Title,
    Code,
    Underline,
    Highlight,
    CodeBlock,
    FigCaption,
    Embeds,
    Link,
    EmojiSuggestion,
    EmojiPicker,
    CustomCommands,
    Focus.configure({ mode: "shallowest" }),
    ImageExtension.configure({ uploadEndpoint }),
    CharacterCount.configure({ limit: characterLimit }),
    KeyboardShortcuts.configure({ onSubmit, shortcuts: keyboardShortcuts }),
    StarterKit.configure({ document: false, codeBlock: false, code: false }),
    Placeholder.configure({ placeholder: placeholderGenerator(placeholder) }),
  ];

  if (isSlashCommandsActive) {
    customExtensions.push(
      SlashCommands.configure({
        setIsImageUploadVisible,
        options,
        addonCommands,
      })
    );
  }

  if (!isEmpty(mentions)) {
    customExtensions.push(
      Mention.configure({
        suggestion: {
          items: createMentionSuggestions(mentions, showImageInMention),
        },
      })
    );
  }

  if (!isEmpty(variables)) {
    customExtensions.push(
      Variable.configure({ suggestion: { items: () => variables } })
    );
  }

  customExtensions = customExtensions.concat(extensions);

  return customExtensions;
};

export default useCustomExtensions;
