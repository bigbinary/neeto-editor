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

  addOptions() {
    return {
      suggestion: {
        char: ":",
        startOfLine: false,
        pluginKey: EmojiPickerPluginKey,
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
                trigger: "click",
                placement: "top-start",
              });
            },

            onUpdate(props) {
              reactRenderer.updateProps(props);

              popup[0].setProps({
                getReferenceClientRect: props.clientRect,
              });
            },

            onExit(props) {
              if (
                props.editor.view.state.selection.anchor ===
                props.range.to + 1
              ) {
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

export default EmojiPicker;
