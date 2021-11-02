import Mention from "@tiptap/extension-mention";
import tippy from "tippy.js";
import { ReactRenderer } from "@tiptap/react";

import { MentionList } from "./MentionList";

import { getItemLabel } from "./helpers";

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
  configure: ({ suggestion: suggestionConfig = {}, ...otherConfig }) => {
    return Mention.configure({
      ...otherConfig,
      suggestion: { ...suggestion, ...suggestionConfig },
    });
  },
  createSuggestionItems:
    (items = [], limit = 5) =>
    ({ query }) =>
      items
        .filter((item) =>
          getItemLabel(item).toLowerCase().startsWith(query.toLowerCase())
        )
        .slice(0, limit),
};
