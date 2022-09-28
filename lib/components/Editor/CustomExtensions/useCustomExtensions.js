import CharacterCount from "@tiptap/extension-character-count";
import Code from "@tiptap/extension-code";
import Document from "@tiptap/extension-document";
import Focus from "@tiptap/extension-focus";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import { isEmpty } from "ramda";

import CodeBlock from "./CodeBlock/ExtensionConfig";
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
import SpecialMentions from "./SpecialMentions/ExtensionConfig";
import Table from "./Table/ExtensionConfig";
import Variable from "./Variable/ExtensionConfig";
import VideoExtension from "./Video/ExtensionConfig";

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
  uploadEndpoint,
  isVideoEmbedActive,
  setMediaUploader,
  setIsEmbedModalOpen,
}) => {
  let customExtensions = [
    Document,
    Code,
    Underline,
    Highlight,
    CodeBlock,
    FigCaption,
    Link,
    EmojiSuggestion,
    EmojiPicker,
    CustomCommands,
    CharacterCount,
    Focus.configure({ mode: "shallowest" }),
    VideoExtension,
    ImageExtension.configure({ uploadEndpoint }),
    StarterKit.configure({ document: false, codeBlock: false, code: false }),
    KeyboardShortcuts.configure({
      onSubmit,
      shortcuts: keyboardShortcuts,
    }),
    Placeholder.configure({ placeholder }),
    Table,
    TableRow,
    TableHeader,
    TableCell,
  ];
  if (isVideoEmbedActive) {
    customExtensions.push(Embeds);
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

    customExtensions.push(
      Mention.configure({
        suggestion: {
          items,
        },
      })
    );

    customExtensions.push(
      SpecialMentions.configure({
        suggestion: {
          items,
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
