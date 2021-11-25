import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Typography from "@tiptap/extension-typography";
import Highlight from "@tiptap/extension-highlight";
import Dropcursor from "@tiptap/extension-dropcursor";
import Link from "@tiptap/extension-link";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import isEmpty from "lodash.isempty";

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
      Document.extend({
        content: forceTitle ? "heading block*" : "block+",
      }),
      StarterKit.configure({
        document: false,
        code: {
          HTMLAttributes: {
            style:
              'font-weight: 500; font-family: "JetBrains Mono", monospace; padding: 2px 5px; border-radius: 4px; background: #00000010; color: #000',
          },
        },
        blockquote: {
          HTMLAttributes: {
            style:
              "font-weight: 500; font-style: italic; color: #111827; border-left-width: 0.25rem; border-left-color: #e5e7eb; quotes: '\\201C''\\201D''\\2018''\\2019'; margin-top: 1.6em; margin-bottom: 1.6em; padding-left: 1em;",
          },
        },
        orderedList: {
          HTMLAttributes: {
            style: "list-style: revert; padding: revert; margin: revert;",
          },
        },
        bulletList: {
          HTMLAttributes: {
            style: "list-style: revert; padding: revert; margin: revert;",
          },
        },
      }),
      Underline,
      Typography,
      TextStyle,
      Highlight,
      CodeBlock,
      ImageExtension,
      Dropcursor,
      Embeds.configure({
        HTMLAttributes: { style: "width: 560px; height: 315px;" },
      }),
      Link.configure({
        HTMLAttributes: { style: "color: #1053f9;" },
      }),
      Color,
      Placeholder.configure({
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
