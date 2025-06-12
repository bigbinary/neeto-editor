import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { Close } from "neetoicons";
import { Button } from "neetoui";

const CalloutComponent = ({ node, deleteNode }) => {
  const { type, emoji } = node.attrs;

  const handleDelete = () => {
    deleteNode();
  };

  return (
    <NodeViewWrapper
      className={`neeto-editor__callout neeto-editor__callout--${type} group`}
      data-emoji={emoji}
      data-type={type}
    >
      <div className="callout-container">
        <span className="callout-emoji">{emoji}</span>
        <NodeViewContent className="callout-content" />
        <Button
          className="callout-delete-button"
          icon={Close}
          size="small"
          style="text"
          onClick={handleDelete}
        />
      </div>
    </NodeViewWrapper>
  );
};

export default CalloutComponent;
