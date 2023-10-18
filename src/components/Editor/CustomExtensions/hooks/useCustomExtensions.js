import CharacterCount from "@tiptap/extension-character-count";
import Code from "@tiptap/extension-code";
import Color from "@tiptap/extension-color";
import Document from "@tiptap/extension-document";
import Focus from "@tiptap/extension-focus";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import { isEmpty } from "ramda";

import { EDITOR_OPTIONS } from "common/constants";

import HighlightInternal from "../BackgroundColor/ExtensionConfig";
import CodeBlock from "../CodeBlock/ExtensionConfig";
import CustomCommands from "../CustomCommands/ExtensionConfig";
import Embeds from "../Embeds/ExtensionConfig";
import EmojiPicker from "../Emoji/EmojiPicker/ExtensionConfig";
import EmojiSuggestion from "../Emoji/EmojiSuggestion/ExtensionConfig";
import ImageExtension from "../Image/ExtensionConfig";
import FigCaption from "../Image/FigCaption";
import KeyboardShortcuts from "../KeyboardShortcuts/ExtensionConfig";
import Mention, { createMentionSuggestions } from "../Mention/ExtensionConfig";
import Placeholder from "../Placeholder/ExtensionConfig";
import SlashCommands from "../SlashCommands/ExtensionConfig";
import SpecialMentions from "../SpecialMentions/ExtensionConfig";
import Table from "../Table/ExtensionConfig";
import Variable from "../Variable/ExtensionConfig";
import VideoExtension from "../Video/ExtensionConfig";

const useCustomExtensions = ({
  placeholder,
  extensions,
  mentions,
  variables,
  isSlashCommandsActive,
  options,
  addonCommands,
  onSubmit,
  keyboardShortcuts,
  isVideoEmbedActive,
  setMediaUploader,
  setIsEmbedModalOpen,
  openImageInNewTab,
}) => {
  let customExtensions = [
    CharacterCount,
    Code,
    CodeBlock,
    CustomCommands,
    Document,
    EmojiSuggestion,
    EmojiPicker,
    FigCaption,
    HighlightInternal,
    Focus.configure({ mode: "shallowest" }),
    Highlight,
    VideoExtension,
    ImageExtension.configure({ openImageInNewTab }),
    Link.configure({ autolink: false }),
    Placeholder.configure({ placeholder }),
    StarterKit.configure({ document: false, codeBlock: false, code: false }),
    TextStyle,
    Underline,
    KeyboardShortcuts.configure({
      onSubmit,
      shortcuts: keyboardShortcuts,
    }),
  ];
  if (isVideoEmbedActive) {
    customExtensions.push(Embeds);
  }

  if (options.includes(EDITOR_OPTIONS.TABLE)) {
    customExtensions.push(
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell
    );
  }

  if (options.includes(EDITOR_OPTIONS.TEXT_COLOR)) {
    customExtensions.push(Color);
  }

  if (isSlashCommandsActive) {
    customExtensions.push(
      SlashCommands.configure({
        options,
        addonCommands,
        setMediaUploader,
        setIsEmbedModalOpen,
      })
    );
  }

  if (!isEmpty(mentions)) {
    const items = createMentionSuggestions(mentions);

    customExtensions.push(Mention.configure({ suggestion: { items } }));

    customExtensions.push(SpecialMentions.configure({ suggestion: { items } }));
  }

  if (!isEmpty(variables)) {
    customExtensions.push(Variable);
  }

  customExtensions = customExtensions.concat(extensions);

  return customExtensions;
};

export default useCustomExtensions;
