import React from "react";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";

export default function index(props) {
  return (
    <NodeViewWrapper>
      <pre>
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  );
}
