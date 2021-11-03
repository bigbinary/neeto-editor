import sharedState from "../../sharedState";
import { Extension } from "@tiptap/core";
import CommandsList from "./CommandsList";
import { PluginKey } from "prosemirror-state";
import Suggestion from "@tiptap/suggestion";
import tippy from "tippy.js";
import { ReactRenderer } from "@tiptap/react";
import {
  BsCardText,
  BsTypeH1,
  BsTypeH2,
  BsListOl,
  BsListUl,
  BsCodeSlash,
  BsCardImage,
  BsFillCameraVideoFill,
  BsBlockquoteLeft,
} from "react-icons/bs";

export const CommandsPluginKey = new PluginKey("commands");

export default Extension.create({
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

        items: () => {
          return [
            {
              title: "Paragraph",
              description: "Add a plain text block",
              Icon: BsCardText,
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
              Icon: BsTypeH1,
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
              Icon: BsTypeH2,
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
              Icon: BsListOl,
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
              Icon: BsListUl,
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
              Icon: BsBlockquoteLeft,
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
              Icon: BsCardImage,
              command: ({ editor, range }) => {
                sharedState.showImageUpload = true;
                sharedState.range = range;
                editor.chain().focus().deleteRange(range).run();
              },
            },
            {
              title: "Youtube/Vimeo",
              description: "Embed a video from major services",
              Icon: BsFillCameraVideoFill,
              command: ({ editor, range }) => {
                const embedURL = prompt("Please enter Youtube/Vimeo embed URL");
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
              Icon: BsCodeSlash,
              command: ({ editor, range }) => {
                editor
                  .chain()
                  .focus()
                  .deleteRange(range)
                  .toggleCodeBlock()
                  .run();
              },
            },
          ];
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
