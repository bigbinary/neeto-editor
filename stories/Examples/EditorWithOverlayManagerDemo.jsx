import React, { useRef, useState } from "react";

import { Button, Pane, Typography } from "@bigbinary/neetoui";

import { Editor } from "../../src";

const EditorWithOverlayManager = () => {
  const [showPane, setShowPane] = useState(false);
  const initialFocusRef = useRef(null);

  return (
    <>
      <Button label="Show Pane" onClick={() => setShowPane(true)} />
      <Pane
        initialFocusRef={initialFocusRef}
        isOpen={showPane}
        onClose={() => setShowPane(false)}
      >
        <Pane.Header>
          <Typography style="h2" weight="semibold">
            Typography
          </Typography>
        </Pane.Header>
        <Editor ref={initialFocusRef} />
      </Pane>
    </>
  );
};

export default EditorWithOverlayManager;
