import { Extension } from "@tiptap/core";
import CommandsList from "./CommandsList";
import { PluginKey } from "prosemirror-state";
import Suggestion from "@tiptap/suggestion";
import tippy from "tippy.js";
import { ReactRenderer } from "@tiptap/react";
import isEmpty from "lodash.isempty";
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

import { validateYouTubeUrl, validateVimeoUrl } from "utils/embeds";

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
        title: "Paragraph",
        description: "Add a plain text block",
        Icon: Paragraph,
        optionName: "font-size",
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setNode("paragraph").run();
        },
      },
      {
        title: "H1",
        description: "Add a big heading",
        Icon: TextH1,
        optionName: "font-size",
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
        title: "H2",
        description: "Add a sub-heading",
        Icon: TextH2,
        optionName: "font-size",
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
        title: "Numbered list",
        description: "Add a list with numbering",
        Icon: ListNumber,
        optionName: "ordered-list",
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleOrderedList().run();
        },
      },
      {
        title: "Bulleted list",
        description: "Add an list bullets",
        Icon: ListDot,
        optionName: "bullet-list",
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleBulletList().run();
        },
      },
      {
        title: "Blockquote",
        description: "Add a quote",
        Icon: Blockquote,
        optionName: "block-quote",
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleBlockquote().run();
        },
      },
      {
        title: "Image",
        description: "Add an image",
        Icon: Image,
        optionName: "image-upload",
        command: ({ editor, range }) => {
          setImageUploadVisible(true);
          editor.chain().focus().deleteRange(range).run();
        },
      },
      {
        title: "Code block",
        description: "Add a code block with syntax highlighting",
        Icon: Code,
        optionName: "code-block",
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
        },
      },
      {
        title: "Emoji",
        description: "Add an emoji",
        Icon: Smiley,
        optionName: "emoji",
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).insertContent("::").run();
        },
      },
      {
        title: "Divider",
        description: "Add an horizontal line to separate sections",
        optionName: "divider",
        Icon: Minus,
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setHorizontalRule().run();
        },
      },
      {
        title: "Embed Youtube/Vimeo",
        description: "Embed a video from major services",
        Icon: Video,
        optionName: "video-embed",
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
        title: "Mention",
        description: "Mention a user",
        optionName: "mention",
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

    console.log({ addonCommands, commandItems });

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
                  popup[0].destroy();
                  reactRenderer.destroy();
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
