import CharacterCount from "@tiptap/extension-character-count";
import Code from "@tiptap/extension-code";
import Document from "@tiptap/extension-document";
import Focus from "@tiptap/extension-focus";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import { isEmpty, mergeLeft } from "ramda";

import CodeBlock from "./CodeBlock/ExtensionConfig";
import { DEFAULT_CONFIG } from "./constants";
import CustomCommands from "./CustomCommands/ExtensionConfig";
import Embeds from "./Embeds/ExtensionConfig";
import EmojiPicker from "./Emoji/EmojiPicker/ExtensionConfig";
import EmojiSuggestion from "./Emoji/EmojiSuggestion/ExtensionConfig";
import ImageExtension from "./Image/ExtensionConfig";
import FigCaption from "./Image/FigCaption";
import KeyboardShortcuts from "./KeyboardShortcuts/ExtensionConfig";
import Mention, { createMentionSuggestions } from "./Mention/ExtensionConfig";
import Placeholder from "./Placeholder/ExtensionConfig";
import SlashCommands from "./SlashCommands/ExtensionConfig";
import Variable from "./Variable/ExtensionConfig";

const useCustomExtensions = ({
  placeholder,
  extensions,
  mentions,
  variables,
  isSlashCommandsActive,
  setIsImageUploadVisible,
  options,
  addonCommands,
  onSubmit,
  keyboardShortcuts,
  uploadEndpoint,
  config,
}) => {
  const customConfig = mergeLeft(config, DEFAULT_CONFIG);
  let customExtensions = [
    Document,
    Code.configure(customConfig.code),
    Underline.configure(customConfig.underline),
    Highlight.configure(customConfig.highlight),
    CodeBlock.configure(customConfig.codeBlock),
    FigCaption.configure(customConfig.figCaption),
    Embeds.configure(customConfig.embeds),
    Link.configure(customConfig.link),
    EmojiSuggestion.configure(customConfig.emojiSuggestion),
    EmojiPicker.configure(customConfig.emojiPicker),
    CustomCommands.configure(customConfig.customCommands),
    CharacterCount.configure(customConfig.characterCount),
    Focus.configure(customConfig.focus),
    ImageExtension.configure({ uploadEndpoint }),
    KeyboardShortcuts.configure({ onSubmit, shortcuts: keyboardShortcuts }),
    StarterKit.configure(customConfig.starterKit),
    Placeholder.configure(mergeLeft({ placeholder }, customConfig.placeholder)),
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
          items: createMentionSuggestions(mentions),
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
