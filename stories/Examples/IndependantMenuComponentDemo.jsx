import React from "react";

import { prop } from "ramda";

import { Editor, Menu, useEditorStore } from "../../lib";

const IndependantMenuComponentDemo = () => {
  const EDITOR_KEY = "NEETO_EDITOR_KEY";
  const editor = useEditorStore(prop(EDITOR_KEY));

  return (
    <div className="space-y-4">
      <Menu editor={editor} />
      <h2>Other components</h2>
      <Editor
        autoFocus
        contentClassName="border"
        editorKey={EDITOR_KEY}
        initialValue="<p>Hello World</p>"
        menuType="none"
      />
    </div>
  );
};

export default IndependantMenuComponentDemo;
