import React, { useCallback, useState } from "react";

import { Editor, Menu, Attachments } from "../../lib";

const IndependantMenuComponent = () => {
  const [editor, setEditor] = useState(null);
  const editorRef = useCallback(node => {
    if (node) setEditor(node.editor);
  }, []);

  return (
    <div className="space-y-4">
      <Menu editor={editor} />
      <h2>Other components</h2>
      <Attachments
        config={{
          maxFileSize: 100 * 1024 * 1024,
          maxNumberOfFiles: 1,
          allowedFileTypes: [".pdf"],
        }}
      />
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
