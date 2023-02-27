import React from "react";

import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";

const CodeBlockComponent = () => (
  <NodeViewWrapper data-cy="neeto-editor-code-block">
    <pre>
      <NodeViewContent as="code" />
    </pre>
  </NodeViewWrapper>
);

export default CodeBlockComponent;
