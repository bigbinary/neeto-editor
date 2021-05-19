import Commands from "./Commands";
import CommandsList from "./CommandsList";
import tippy from "tippy.js";
import { ReactRenderer } from "@tiptap/react";
import {
  BsCardText,
  BsTypeH1,
  BsTypeH2,
  BsListOl,
  BsListUl,
  BsCodeSlash,
  BsBlockquoteLeft,
} from "react-icons/bs";

export default Commands.configure({
  HTMLAttributes: {
    class: "commands",
  },
  suggestion: {
    items: (query) => {
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
            editor.chain().focus().deleteRange(range).toggleOrderedList().run();
          },
        },
        {
          title: "Bulleted list",
          description: "Add an list bullets",
          Icon: BsListUl,
          command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleBulletList().run();
          },
        },
        {
          title: "Blockquote",
          description: "Add a quote",
          Icon: BsBlockquoteLeft,
          command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleBlockquote().run();
          },
        },
        {
          title: "Code block",
          description: "Add a code block with syntax highlighting",
          Icon: BsCodeSlash,
          command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
          },
        },
      ]
        .filter((item) =>
          item.title.toLowerCase().startsWith(query.toLowerCase())
        )
        .slice(0, 10);
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
});
