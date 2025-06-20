import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { findBy } from "neetocist";
import { Close } from "neetoicons";
import { Megaphone } from "neetoicons/misc";
import { Button } from "neetoui";

import { CALLOUT_TYPES } from "components/Editor/Menu/Fixed/components/CalloutDropdown/constants";

const CalloutComponent = ({ node, deleteNode }) => {
  const { type } = node.attrs;
  const Icon = findBy({ type }, CALLOUT_TYPES)?.icon || Megaphone;

  return (
    <NodeViewWrapper
      className={`neeto-editor__callout neeto-editor__callout--${type} group`}
      data-emoji={type}
    >
      <div className="callout-container">
        <span className="callout-emoji">
          <Icon />
        </span>
        <NodeViewContent className="callout-content" />
        <Button
          className="callout-delete-button"
          icon={Close}
          size="small"
          style="text"
          onClick={deleteNode}
        />
      </div>
    </NodeViewWrapper>
  );
};

export default CalloutComponent;
