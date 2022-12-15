import React, { useCallback, useState } from "react";

import { Editor, FileAttachment, Menu } from "../../lib";

const IndependantMenuComponent = () => {
  const [editor, setEditor] = useState(null);
  const [attachments, setAttachments] = useState([
    {
      filename: "Screenshot 2022-12-07 at 8.52.49 PM.png",
      signedId:
        "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZG89IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ab87f3e0202efde0775abfe68b468c71efc8131b",
      contentType: "image/png",
      url: "http://spinkart.lvh.me:9013/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZG89IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ab87f3e0202efde0775abfe68b468c71efc8131b/Screenshot%202022-12-07%20at%208.52.49%20PM.png",
    },
    {
      filename: "Screenshot 2022-12-14 at 3.34.54 PM.png",
      signedId:
        "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZHM9IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--a3d8aa0d867a9e69cbe063c310258ddf6dd9e1e8",
      contentType: "image/png",
      url: "http://spinkart.lvh.me:9013/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZHM9IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--a3d8aa0d867a9e69cbe063c310258ddf6dd9e1e8/Screenshot%202022-12-14%20at%203.34.54%20PM.png",
    },
    {
      filename: "Screenshot 2022-11-21 at 5.13.43 PM.png",
      signedId:
        "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZHc9IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--9d3d6181abddddf8793635bfe06e2a3954f6b4d0",
      contentType: "image/png",
      url: "http://spinkart.lvh.me:9013/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZHc9IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--9d3d6181abddddf8793635bfe06e2a3954f6b4d0/Screenshot%202022-11-21%20at%205.13.43%20PM.png",
    },
  ]);

  const editorRef = useCallback(node => {
    if (node) setEditor(node.editor);
  }, []);

  return (
    <div className="space-y-4">
      <Menu editor={editor} />
      <h2>Other components</h2>
      <Editor
        autoFocus
        contentClassName="border"
        initialValue="<p>Hello World</p>"
        menuType="none"
        ref={editorRef}
      />
      <FileAttachment attachments={attachments} onChange={setAttachments} />
    </div>
  );
};

export default IndependantMenuComponent;
