import React from "react";
import { Node } from "@tiptap/core";
import { ReactRenderer } from "@tiptap/react";
import Suggestion from "@tiptap/suggestion";
import { PluginKey } from "prosemirror-state";
import tippy from "tippy.js";
import EmojiSuggestionMenu from "./EmojiSuggestionMenu";
import { emojiIndex } from "emoji-mart";

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
          chain()
            .focus()
            .insertContent(`${emoji?.native || ""} `)
            .run();
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
  char: ":",
  startOfLine: false,
  pluginKey: EmojiPickerPluginKey,
  items: () => [],

  render: () => {
    let reactRenderer;
    let popup;

    return {
      onStart: (props) => {
        const { range, query } = props;
        localStorage.setItem("props", JSON.stringify({ range, query }));
        localStorage.setItem("emoji", "");
        reactRenderer = new ReactRenderer(
          () => <EmojiSuggestionMenu {...props} />,
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
          trigger: "manual",
          placement: "top-start",
        });
      },
      onUpdate(props) {
        const { range, query } = props;
        localStorage.setItem("props", JSON.stringify({ range, query }));
        reactRenderer.updateProps(props);

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        });
      },

      onExit(props) {
        if (!localStorage.getItem("emoji")) {
          props.editor
            .chain()
            .focus()
            .deleteRange(props.range)
            .setEmoji(emojiIndex.search(props.query)?.[0])
            .run();
        }

        popup[0].destroy();
        reactRenderer.destroy();
      },
    };
  },
};

export default EmojiPicker.configure({
  suggestion: { ...suggestionConfig },
});
