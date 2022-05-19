import React from "react";

import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";

export default function index() {
  return (
    <NodeViewWrapper data-cy="neeto-editor-code-block">
      <pre>
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  );
}
