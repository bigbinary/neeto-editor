import { mergeAttributes } from "@tiptap/core";
import Mention from "@tiptap/extension-mention";
import { ReactRenderer } from "@tiptap/react";
import { PluginKey } from "prosemirror-state";
import tippy from "tippy.js";

import { MentionList } from "./MentionList";
import { createMentionSuggestions } from "./utils";

const SpecialMentionPluginKey = new PluginKey("special-mention");

const renderLabel = ({ options, node }) =>
  `${options.suggestion.char}${node.attrs.label ?? node.attrs.id}`;

const suggestion = {
  char: "@@",
  pluginKey: SpecialMentionPluginKey,

  render: () => {
    let reactRenderer;
    let popup;

    return {
      onStart: props => {
        reactRenderer = new ReactRenderer(MentionList, {
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
        if (props.event.key === "Escape") {
          popup[0].hide();

          return true;
        }

        return reactRenderer.ref?.onKeyDown(props);
      },

      onExit() {
        popup[0].destroy();
        reactRenderer.destroy();
      },
    };
  },
};

const SpecialMentions = Mention.extend({
  name: "special-mention",

  addCommands() {
    return {
      setMention:
        ({ id, label }) =>
        ({ chain }) => {
          chain()
            .focus()
            .insertContent([
              {
                type: this.name,
                attrs: {
                  id,
                  label,
                },
              },
              {
                type: "text",
                text: " ",
              },
            ])
            .run();
        },
    };
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(
        { "data-type": this.name },
        this.options.HTMLAttributes,
        HTMLAttributes
      ),
      renderLabel({
        options: this.options,
        node,
      }),
    ];
  },
});

export default {
  configure: ({ suggestion: suggestionConfig = {}, ...otherConfig }) =>
    SpecialMentions.configure({
      ...otherConfig,
      suggestion: { ...suggestion, ...suggestionConfig },
    }),
};

export { createMentionSuggestions };
