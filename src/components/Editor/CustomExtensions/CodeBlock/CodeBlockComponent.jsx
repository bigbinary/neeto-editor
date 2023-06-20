import React from "react";

import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import { copyToClipboard } from "neetocommons/utils";
import { Copy } from "neetoicons";
import { Button } from "neetoui";

const CodeBlockComponent = ({ node }) => (
  <NodeViewWrapper data-cy="neeto-editor-code-block">
    <pre>
      <Button
        className="copy-button"
        icon={Copy}
        size="small"
        style="text"
        onClick={() => copyToClipboard(node?.content?.content[0]?.text)}
      />
      <NodeViewContent as="code" />
    </pre>
  </NodeViewWrapper>
);

export default CodeBlockComponent;
