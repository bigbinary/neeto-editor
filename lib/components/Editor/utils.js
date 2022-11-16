import { Slice, Fragment, Node } from "prosemirror-model";
import { Selection } from "prosemirror-state";

import {
  EDITOR_LINE_HEIGHT,
  EDITOR_BORDER_SIZE,
  EDITOR_PADDING_SIZE,
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