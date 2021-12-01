import React from "react";
import { Node } from "@tiptap/core";
import { ReactRenderer } from "@tiptap/react";
import Suggestion from "@tiptap/suggestion";
import { PluginKey } from "prosemirror-state";
import tippy from "tippy.js";
import EmojiMartPicker from "./Picker";

export const EmojiPickerPluginKey = new PluginKey("emoji-picker");

const EmojiPicker = Node.create({
  name: "emojiPicker",

  group: "inline",

  inline: true,

  selectable: false,

  atom: true,

  addCommands() {
    return {
      setEmoji:
        (emoji) =>
        ({ chain }) => {
          chain().focus().insertContent(emoji.native).run();
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

const suggestionConfig = {
  char: "##",
  startOfLine: false,
  pluginKey: EmojiPickerPluginKey,
  command: ({ editor, range, props }) => {
    editor.chain().focus().deleteRange(range).setEmoji(props).run();
  },

  items: () => [],
  render: () => {
    let reactRenderer;
    let popup;

    return {
      onStart: (props) => {
        reactRenderer = new ReactRenderer(
          () => <EmojiMartPicker editor={props.editor} />,
          {
            props,
            editor: props.editor,
          }
        );

        popup = tippy("body", {
          theme: "light",
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: reactRenderer.element,
          showOnCreate: true,
          interactive: true,
          placement: "bottom-start",
        });
      },
      onUpdate(props) {
        reactRenderer.updateProps(props);

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        });
      },

      onExit() {
        popup[0].destroy();
        reactRenderer.destroy();
      },
    };
  },
};

export default EmojiPicker.configure({
  suggestion: { ...suggestionConfig },
});
