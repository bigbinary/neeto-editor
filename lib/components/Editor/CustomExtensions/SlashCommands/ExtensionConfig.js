import { Extension } from "@tiptap/core";
import { ReactRenderer } from "@tiptap/react";
import Suggestion from "@tiptap/suggestion";
import { isEmpty } from "lodash";
import { PluginKey } from "prosemirror-state";
import tippy from "tippy.js";

import {
  highlightFocussedNode,
  resetFocussedNode,
} from "utils/focusHighlighter";

import CommandsList from "./CommandsList";
import { NO_RESULT_MENU_ITEM } from "./constants";
import { buildCommandItems } from "./utils";

const CommandsPluginKey = new PluginKey("commands");

export default {
  configure: ({
    addonCommands,
    options,
    setMediaUploader,
    onClickAttachment,
  }) => {
    const commandItems = buildCommandItems({
      options,
      addonCommands,
      setMediaUploader,
      onClickAttachment,
    });

    return Extension.create({
      name: "slash-commands",

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

            items: ({ query }) => {
              const filteredItems = commandItems.filter(({ title }) =>
                title.toLowerCase().includes(query.toLowerCase())
              );

              return isEmpty(filteredItems)
                ? [NO_RESULT_MENU_ITEM]
                : filteredItems;
            },

            render: () => {
              let reactRenderer;
              let popup;

              return {
                onStart: props => {
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
                    arrow: false,
                    zIndex: 99999,
                    role: "dropdown",
                    theme: "neeto-editor-slash-menu",
                  });

                  highlightFocussedNode();
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
                  popup && popup[0].destroy();
                  reactRenderer && reactRenderer.destroy();
                  resetFocussedNode();
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
  },
};
