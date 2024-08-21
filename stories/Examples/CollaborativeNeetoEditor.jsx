import React, { useCallback, useState } from "react";

import { TiptapCollabProvider } from "@hocuspocus/provider";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import * as Y from "yjs";

import { Editor } from "src";

const CollaborativeNeetoEditor = () => {
  const doc = new Y.Doc();
  const [editor, setEditor] = useState(null);
  const editorRef = useCallback(node => {
    if (node) setEditor(node.editor);
  }, []);

  const provider = new TiptapCollabProvider({
    name: "neeto-editor_document.name_new",
    appId: "7j9y6m10",
    token: "notoken",
    document: doc,
  });

  const sampleNames = ["Sam", "Alex", "Liam", "Olivia", "Emma", "Oliver"];

  const sampleColors = ["#F56565", "#ED64A6", "#ED64A6", "#ED64A6"];

  const getRandomName = list => {
    const randomIndex = Math.floor(Math.random() * list.length);

    return list[randomIndex];
  };

  return (
    <div className="space-y-4">
      <Editor
        autoFocus
        contentClassName="border"
        ref={editorRef}
        extensions={[
          Collaboration.configure({ document: doc }),
          CollaborationCursor.configure({
            provider,
            user: {
              name: getRandomName(sampleNames),
              color: getRandomName(sampleColors),
            },
          }),
        ]}
      />
    </div>
  );
};

export default CollaborativeNeetoEditor;
