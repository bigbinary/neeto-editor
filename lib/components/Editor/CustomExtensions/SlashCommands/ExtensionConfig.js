import tippy from "tippy.js";
import isEmpty from "lodash.isempty";
import { PluginKey } from "prosemirror-state";
import {
  Paragraph,
  TextH1,
  TextH2,
  ListDot,
  ListNumber,
  Blockquote,
  Image,
  Code,
  Smiley,
  Minus,
  Email,
  Video,
} from "@bigbinary/neeto-icons";
import { Extension } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";
import { ReactRenderer } from "@tiptap/react";
import { validateYouTubeUrl, validateVimeoUrl } from "utils/embeds";
import { ADD_ON_OPTIONS } from "constants/common";

import CommandsList from "./CommandsList";

export const CommandsPluginKey = new PluginKey("commands");

export default {
  configure: ({
    setImageUploadVisible,
    mentions,
    addonCommands,
    options: allowedCommandOptions,
  }) => {
    let commandItems = [
      {
        optionName: ADD_ON_OPTIONS.FONT_SIZE,
        title: "Paragraph",
        description: "Add a plain text block",
        Icon: Paragraph,
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setNode("paragraph").run();
        },
      },
      {
        optionName: ADD_ON_OPTIONS.FONT_SIZE,
        title: "H1",
        description: "Add a big heading",
        Icon: TextH1,
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setNode("heading", { level: 1 })
            .run();
        },
      },
      {
        optionName: ADD_ON_OPTIONS.FONT_SIZE,
        title: "H2",
        description: "Add a sub-heading",
        Icon: TextH2,
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setNode("heading", { level: 2 })
            .run();
        },
      },
      {
        optionName: ADD_ON_OPTIONS.LIST_ORDERED,
        title: "Numbered list",
        description: "Add a list with numbering",
        Icon: ListNumber,
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleOrderedList().run();
        },
      },
      {
        optionName: ADD_ON_OPTIONS.LIST_BULLETS,
        title: "Bulleted list",
        description: "Add an list bullets",
        Icon: ListDot,
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleBulletList().run();
        },
      },
      {
        optionName: ADD_ON_OPTIONS.BLOCKQUOTE,
        title: "Blockquote",
        description: "Add a quote",
        Icon: Blockquote,
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleBlockquote().run();
        },
      },
      {
        optionName: ADD_ON_OPTIONS.IMAGE_UPLOAD,
        title: "Image",
        description: "Add an image",
        Icon: Image,
        command: ({ editor, range }) => {
          setImageUploadVisible(true);
          editor.chain().focus().deleteRange(range).run();
        },
      },
      {
        optionName: ADD_ON_OPTIONS.CODE_BLOCK,
        title: "Code block",
        description: "Add a code block with syntax highlighting",
        Icon: Code,
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
        },
      },
      {
        optionName: ADD_ON_OPTIONS.EMOJI,
        title: "Emoji",
        description: "Add an emoji",
        Icon: Smiley,
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).insertContent("::").run();
        },
      },
      {
        optionName: ADD_ON_OPTIONS.DIVIDER,
        title: "Divider",
        description: "Add an horizontal line to separate sections",
        Icon: Minus,
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setHorizontalRule().run();
        },
      },
      {
        optionName: ADD_ON_OPTIONS.VIDEO_EMBED,
        title: "Embed Youtube/Vimeo",
        description: "Embed a video from major services",
        Icon: Video,
        command: ({ editor, range }) => {
          const embedURL = prompt("Please enter Youtube/Vimeo embed URL");

          const validatedUrl =
            validateYouTubeUrl(embedURL) || validateVimeoUrl(embedURL);

          if (validatedUrl) {
            editor
              .chain()
              .focus()
              .deleteRange(range)
              .setExternalVideo({ src: validatedUrl })
              .run();
          } else {
            editor
              .chain()
              .focus()
              .deleteRange(range)
              .insertContent("#invalid")
              .run();
          }
        },
      },
    ];

    if (!isEmpty(mentions)) {
      commandItems.push({
        optionName: ADD_ON_OPTIONS.MENTION,
        title: "Mention",
        description: "Mention a user",
        Icon: Email,
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).insertContent("@").run();
        },
      });
    }

    if (!isEmpty(allowedCommandOptions)) {
      commandItems = commandItems.filter(({ optionName }) =>
        allowedCommandOptions.includes(optionName)
      );
    }

    if (!isEmpty(addonCommands)) {
      commandItems = commandItems.concat(addonCommands);
    }

    return Extension.create({
      addOptions() {
        return {
          HTMLAttributes: {
            class: "commands",
          },
          suggestion: {
            char: "/",
            startOfLine: false,
            pluginKey: CommandsPluginKey,
            command: ({ editor, range, props }) => {
              props.command({ editor, range });
            },

            items: ({ query }) => {
              const filteredItems = commandItems.filter(({ title }) =>
                title.toLowerCase().includes(query.toLowerCase())
              );

              const noResultsItem = {
                title: "No results",
                command: ({ editor, range }) => {
                  editor.chain().focus().deleteRange(range).run();
                },
              };

              return isEmpty(filteredItems) ? [noResultsItem] : filteredItems;
            },

            render: () => {
              let reactRenderer;
              let popup;

              return {
                onStart: (props) => {
                  const node = document.querySelector('[id^="tippy"]');
                  node && node.remove();

                  reactRenderer = new ReactRenderer(CommandsList, {
                    props,
                    editor: props.editor,
                  });

                  popup = tippy("body", {
                    getReferenceClientRect: props.clientRect,
                    appendTo: () => document.body,
                    content: reactRenderer.element,
                    showOnCreate: true,
                    interactive: true,
                    trigger: "manual",
                    placement: "bottom-start",
                    arrow: false,
                    zIndex: 99999,
                  });
                },
                onUpdate(props) {
                  reactRenderer.updateProps(props);

                  popup[0].setProps({
                    getReferenceClientRect: props.clientRect,
                  });
                },
                onKeyDown(props) {
                  return reactRenderer.ref?.onKeyDown(props);
                },
                onExit() {
                  popup && popup[0].destroy();
                  reactRenderer && reactRenderer.destroy();
                },
              };
            },
          },
        };
      },

      addProseMirrorPlugins() {
        return [
          Suggestion({
            editor: this.editor,
            ...this.options.suggestion,
          }),
        ];
      },
    });
  },
};
