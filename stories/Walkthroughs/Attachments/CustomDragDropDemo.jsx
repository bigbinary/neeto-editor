import React, { useState, useRef } from "react";

import { Button, Pane, Typography } from "@bigbinary/neetoui";

import { Attachments } from "../../../src";

const CustomDragDropDemo = () => {
  const [showPane, setShowPane] = useState(false);
  const [attachments, setAttachments] = useState([]);

  const dragDropRef = useRef(null);

  return (
    <>
      <Button label="Show Pane" onClick={() => setShowPane(true)} />
      <Pane isOpen={showPane} onClose={() => setShowPane(false)}>
        <Pane.Header>
          <Typography style="h2" weight="semibold">
            Typography
          </Typography>
        </Pane.Header>
        <div
          className="flex justify-center w-full ne-attachments__wrapper h-96"
          ref={dragDropRef}
        >
          <Attachments
            attachments={attachments}
            dragDropRef={dragDropRef}
            onChange={setAttachments}
          />
        </div>
      </Pane>
    </>
  );
};
export default CustomDragDropDemo;
