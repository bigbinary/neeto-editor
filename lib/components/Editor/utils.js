import { Slice, Fragment, Node } from "prosemirror-model";
import { Selection } from "prosemirror-state";

import { EDITOR_OPTIONS } from "common/constants";

import {
  EDITOR_LINE_HEIGHT,
  EDITOR_BORDER_SIZE,
  EDITOR_PADDING_SIZE,
} from "./constants";

export const getIsPlaceholderActive = placeholder => {
  if (placeholder) {
    if (typeof placeholder === "string" && placeholder.length) return true;

    if (typeof placeholder === "object" && Object.keys(placeholder).length) {
      return true;
    }

    if (typeof placeholder === "function") return true;
  }

  return false;
};

export const getEditorStyles = ({ rows }) => {
  const styles = {};

  const editorHeight =
    rows * EDITOR_LINE_HEIGHT + 2 * (EDITOR_PADDING_SIZE + EDITOR_BORDER_SIZE);
  styles["min-height"] = `${editorHeight}px`;

  return styles;
};

export const generateAddonOptions = (
  defaults = [],
  addons = [],
  { includeImageUpload } = { includeImageUpload: true }
) => {
  const userAddonOptions = addons.map(option => option.toLowerCase());
  if (includeImageUpload) userAddonOptions.push(EDITOR_OPTIONS.IMAGE_UPLOAD);

  return [].concat(defaults, userAddonOptions);
};

export const clipboardTextParser = (text, context) => {
  const nodes = [];
  const blocks = text.split(/\n/);

  blocks.forEach(line => {
    const nodeJson = { type: "paragraph" };
    if (line.length > 0) {
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

export const stringifyObject = (object, separator = ";") =>
  Object.entries(object).reduce(
    (acc, [key, value]) => (acc += `${key}:${value}${separator}`),
    ""
  );
