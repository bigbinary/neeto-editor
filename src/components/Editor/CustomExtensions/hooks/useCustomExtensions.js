import CharacterCount from "@tiptap/extension-character-count";
import Code from "@tiptap/extension-code";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import Color from "@tiptap/extension-color";
import Document from "@tiptap/extension-document";
import Focus from "@tiptap/extension-focus";
import Highlight from "@tiptap/extension-highlight";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import { EDITOR_OPTIONS } from "common/constants";
import { isEmpty } from "ramda";

import { buildLevelsFromOptions } from "components/Editor/utils";

import HighlightInternal from "../BackgroundColor/ExtensionConfig";
import BulletList from "../BulletList/ExtensionConfig";
import CodeBlock from "../CodeBlock/ExtensionConfig";
import CustomCommands from "../CustomCommands/ExtensionConfig";
import Embeds from "../Embeds/ExtensionConfig";
import EmojiPicker from "../Emoji/EmojiPicker/ExtensionConfig";
import EmojiSuggestion from "../Emoji/EmojiSuggestion/ExtensionConfig";
import ImageExtension from "../Image/ExtensionConfig";
import FigCaption from "../Image/FigCaption";
import KeyboardShortcuts from "../KeyboardShortcuts/ExtensionConfig";
import Link from "../Link/ExtensionConfig";
import Mention, { createMentionSuggestions } from "../Mention/ExtensionConfig";
import Placeholder from "../Placeholder/ExtensionConfig";
import SelectionDecoration from "../SelectionDecoration/ExtensionConfig";
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
  openLinkInNewTab,
  enableReactNodeViewOptimization,
  collaborationProvider,
}) => {
  let customExtensions = [
    CharacterCount,
    Code,
    CodeBlock.configure({ enableReactNodeViewOptimization }),
    CustomCommands,
    Document,
    EmojiSuggestion,
    EmojiPicker,
    FigCaption,
    HighlightInternal,
    SelectionDecoration,
    Focus.configure({ mode: "shallowest" }),
    Highlight,
    VideoExtension,
    ImageExtension.configure({
      openImageInNewTab,
      enableReactNodeViewOptimization,
    }),
    Link.configure({
      HTMLAttributes: { target: openLinkInNewTab ? "_blank" : null },
    }),
    Placeholder.configure({ placeholder }),
    StarterKit.configure({
      document: false,
      codeBlock: false,
      code: false,
      bulletList: false,
      blockquote: options.includes(EDITOR_OPTIONS.BLOCKQUOTE),
      orderedList: options.includes(EDITOR_OPTIONS.LIST_ORDERED),
      history: !collaborationProvider,
      heading: { levels: buildLevelsFromOptions(options) },
    }),
    TextStyle,
    Underline,
    KeyboardShortcuts.configure({
      onSubmit,
      shortcuts: keyboardShortcuts,
      isBlockQuoteActive: options.includes(EDITOR_OPTIONS.BLOCKQUOTE),
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

  if (options.includes(EDITOR_OPTIONS.LIST_BULLETS)) {
    customExtensions.push(BulletList);
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

  if (collaborationProvider) {
    customExtensions.push(
      Collaboration.configure({
        document: collaborationProvider.document ?? collaborationProvider.doc,
      })
    );

    customExtensions.push(
      CollaborationCursor.configure({
        provider: collaborationProvider,
      })
    );
  }

  customExtensions = customExtensions.concat(extensions);

  return customExtensions;
};

export default useCustomExtensions;
