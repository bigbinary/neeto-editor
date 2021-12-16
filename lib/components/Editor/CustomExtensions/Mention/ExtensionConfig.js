import Mention from "@tiptap/extension-mention";
import tippy from "tippy.js";
import { ReactRenderer } from "@tiptap/react";

import { MentionList } from "./MentionList";

import { createMentionSuggestions } from "./helpers";

const suggestion = {
  render: () => {
    let reactRenderer;
    let popup;

    return {
      onStart: (props) => {
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

export default {
  configure: ({ suggestion: suggestionConfig = {}, ...otherConfig }) =>
    Mention.configure({
      ...otherConfig,
      suggestion: { ...suggestion, ...suggestionConfig },
    }),
};

export { createMentionSuggestions };
