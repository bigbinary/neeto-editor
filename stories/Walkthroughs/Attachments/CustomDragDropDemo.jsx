import React, { useState, useRef } from "react";

import { Button, Pane, Typography } from "@bigbinary/neetoui";

import { Attachments } from "../../../lib";

const CustomDragDropDemo = () => {
  const [showPane, setShowPane] = useState(false);

  const dropRef = useRef(null);

  return (
    <>
      <Button label="Show Pane" onClick={() => setShowPane(true)} />
      <Pane isOpen={showPane} onClose={() => setShowPane(false)}>
        <Pane.Header>
          <Typography style="h2" weight="semibold">
            Typography
          </Typography>
        </Pane.Header>
        <div className="ne-attachments__wrapper w-full h-full">
          <div className="flex justify-center w-full h-full" ref={dropRef}>
            <Attachments dragDropRef={dropRef} />
          </div>
        </div>
      </Pane>
    </>
  );
};
export default CustomDragDropDemo;
