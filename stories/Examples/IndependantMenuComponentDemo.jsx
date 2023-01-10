import React, { useCallback, useState } from "react";

import { Editor, Menu } from "../../lib";
import Attachments from "../../lib/components/Attachments";

const IndependantMenuComponent = () => {
  const [editor, setEditor] = useState(null);
  const editorRef = useCallback(node => {
    if (node) setEditor(node.editor);
  }, []);

  return (
    <div className="space-y-4">
      <Menu editor={editor} />
      <h2>Other components</h2>
      <Attachments isIndependent />
      <Editor
        autoFocus
        contentClassName="border"
        initialValue="<p>Hello World</p>"
        menuType="none"
        ref={editorRef}
      />
    </div>
  );
};

export default IndependantMenuComponent;
