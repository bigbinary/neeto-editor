import { Node } from "@tiptap/core";
import { ReactRenderer } from "@tiptap/react";
import Suggestion from "@tiptap/suggestion";
import { PluginKey } from "prosemirror-state";
import tippy from "tippy.js";

import EmojiSuggestionMenu from "./EmojiSuggestionMenu";

export const EmojiSuggestionPluginKey = new PluginKey("emoji-suggestion");

const EmojiSuggestion = Node.create({
  name: "emojiSuggestion",

  group: "inline",

  inline: true,

  selectable: false,

  atom: true,

  addOptions() {
    return {
      suggestion: {
        char: ":",
        startOfLine: false,
        pluginKey: EmojiSuggestionPluginKey,
        items: () => [],

        render: () => {
          let reactRenderer;
          let popup;

          return {
            onStart(props) {
              reactRenderer = new ReactRenderer(EmojiSuggestionMenu, {
                props,
                editor: props.editor,
              });

              popup = tippy("body", {
                theme: "light",
                getReferenceClientRect: props.clientRect,
                appendTo: () => document.body,
                content: reactRenderer.element,
                showOnCreate: true,
                interactive: true,
                trigger: "manual",
                placement: "top-start",
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

export default EmojiSuggestion;
