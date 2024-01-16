import { isNotEmpty } from "neetocist";
import { Slice, Fragment, Node } from "prosemirror-model";
import { Selection } from "prosemirror-state";

import { URL_REGEXP } from "src/common/constants";

import {
  EDITOR_LINE_HEIGHT,
  EDITOR_BORDER_SIZE,
  EDITOR_PADDING_SIZE,
  IMAGE_REGEX,
  IMAGE_REPLACEMENT_PATTERN,
  EMPTY_DIV_REGEX,
  TRAILING_BR_REGEX,
} from "./constants";

export const getEditorStyles = ({ rows }) => {
  const editorHeight =
    rows * EDITOR_LINE_HEIGHT + 2 * (EDITOR_PADDING_SIZE + EDITOR_BORDER_SIZE);

  return `min-height: ${editorHeight}px;`;
};

export const clipboardTextParser = (text, context) => {
  const nodes = [];
  const blocks = text.split(/\n/);

  blocks.forEach(line => {
    const nodeJson = { type: "paragraph" };
    if (isNotEmpty(line)) {
      nodeJson.content = [{ type: "text", text: line }];
    }
    const node = Node.fromJSON(context.doc.type.schema, nodeJson);
    nodes.push(node);
  });

  const fragment = Fragment.fromArray(nodes);

  return Slice.maxOpen(fragment);
};

export const setInitialPosition = editor => {
  const { state, view } = editor;
  const endPosition = Selection.atEnd(state.doc);
  const transaction = state.tr;
  transaction.setSelection(endPosition);
  view.dispatch(transaction);
};

export const isEditorOverlaysActive = () => {
  const active = document.querySelector(
    ".ne-media-uploader,.ne-embed-modal,.tippy-content,.ne-link-popover"
  );

  return active;
};

export const validateAndFormatUrl = url => {
  if (!URL_REGEXP.test(url)) {
    return null;
  }

  if (!/^(https?:\/\/)/i.test(url)) {
    return `https://${url}`;
  }

  return url;
};

export const transformEditorContent = content =>
  content
    ?.replaceAll(IMAGE_REGEX, IMAGE_REPLACEMENT_PATTERN)
    ?.replaceAll(EMPTY_DIV_REGEX, "")
    ?.replace(TRAILING_BR_REGEX, "");

export const isEmojiSuggestionsMenuActive = () =>
  !!document.querySelector(".neeto-editor-emoji-suggestion");
