import Mention from "@tiptap/extension-mention";
import tippy from "tippy.js";
import { ReactRenderer } from "@tiptap/react";

import { MentionList } from "./MentionList";

const suggestion = {
  render: () => {
    let reactRenderer;
    let popup;

    return {
      onStart: (props) => {
        console.log({ props });
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

  createSuggestionItems: (
    items = [],
    { limit = 5, showImage = false } = {}
  ) => {
    const allSuggestions = items.map((item) => {
      let suggestionObj;
      if (typeof item === "string") {
        suggestionObj = { key: item, label: item };
      } else if (typeof item === "object") {
        suggestionObj = { ...item };
      }
      suggestionObj.showImage = showImage;

      return suggestionObj;
    });

    return ({ query }) =>
      allSuggestions
        .filter((suggestion) =>
          suggestion.label.toLowerCase().startsWith(query.toLowerCase())
        )
        .slice(0, limit);
  },
};
