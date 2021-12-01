import React from "react";

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
  Video,
  Code,
  Smiley,
} from "@bigbinary/neeto-icons";
import EmojiPicker from "./EmojiPicker";
import { autoHide } from "utils/tippy";

export const CommandsPluginKey = new PluginKey("commands");

export default {
  configure: ({ setImageUploadVisible }) =>
    Extension.create({
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
              const items = [
                {
                  title: "Paragraph",
                  description: "Add a plain text block",
                  Icon: Paragraph,
                  command: ({ editor, range }) => {
                    editor
                      .chain()
                      .focus()
                      .deleteRange(range)
                      .setNode("paragraph")
                      .run();
                  },
                },
                {
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
                  title: "Numbered list",
                  description: "Add a list with numbering",
                  Icon: ListNumber,
                  command: ({ editor, range }) => {
                    editor
                      .chain()
                      .focus()
                      .deleteRange(range)
                      .toggleOrderedList()
                      .run();
                  },
                },
                {
                  title: "Bulleted list",
                  description: "Add an list bullets",
                  Icon: ListDot,
                  command: ({ editor, range }) => {
                    editor
                      .chain()
                      .focus()
                      .deleteRange(range)
                      .toggleBulletList()
                      .run();
                  },
                },
                {
                  title: "Blockquote",
                  description: "Add a quote",
                  Icon: Blockquote,
                  command: ({ editor, range }) => {
                    editor
                      .chain()
                      .focus()
                      .deleteRange(range)
                      .toggleBlockquote()
                      .run();
                  },
                },
                {
                  title: "Image",
                  description: "Add an image",
                  Icon: Image,
                  command: ({ editor, range }) => {
                    setImageUploadVisible(true);
                    editor.chain().focus().deleteRange(range).run();
                  },
                },
                {
                  title: "Youtube/Vimeo",
                  description: "Embed a video from major services",
                  Icon: Video,
                  command: ({ editor, range }) => {
                    const embedURL = prompt(
                      "Please enter Youtube/Vimeo embed URL"
                    );
                    editor
                      .chain()
                      .focus()
                      .deleteRange(range)
                      .setExternalVideo({ src: embedURL })
                      .run();
                  },
                },
                {
                  title: "Code block",
                  description: "Add a code block with syntax highlighting",
                  Icon: Code,
                  command: ({ editor, range }) => {
                    editor
                      .chain()
                      .focus()
                      .deleteRange(range)
                      .toggleCodeBlock()
                      .run();
                  },
                },
                {
                  title: "Emoji",
                  description: "Add an emoji",
                  Icon: Smiley,
                  command: ({ editor, range }) => {
                    editor.chain().focus().deleteRange(range).run();

                    const reactRenderer = new ReactRenderer(
                      () => <EmojiPicker editor={editor} />,
                      {
                        editor: editor,
                      }
                    );

                    const editorContentRef =
                      editor.contentComponent.editorContentRef.current;

                    const focussedNode =
                      editorContentRef.querySelector(
                        ".ProseMirror-focused>.has-focus"
                      ) ||
                      Array.from(
                        editorContentRef.querySelectorAll(".ProseMirror>*")
                      ).slice(-1)[0];

                    const documentRange = document.createRange();
                    documentRange.selectNode(focussedNode.childNodes[0]);
                    const { x, right } = documentRange.getBoundingClientRect();
                    const horizontalOffset = right - x;
                    documentRange.detach();

                    tippy(focussedNode, {
                      appendTo: editorContentRef,
                      theme: "light",
                      content: reactRenderer.element,
                      showOnCreate: true,
                      interactive: true,
                      trigger: "manual",
                      placement: "bottom-start",
                      plugins: [autoHide],
                      offset: [horizontalOffset, 10],
                    });
                  },
                },
              ];

              const filteredItems = items.filter((item) =>
                item.title.toLowerCase().includes(query.toLowerCase())
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
    }),
};
