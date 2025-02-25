import React, { useRef, useState } from "react";

import { Button, Pane, Typography } from "@bigbinary/neetoui";

import { Editor, EditorContent } from "../../src";

const EditorWithOverlayManager = () => {
  const [content, setContent] = useState(
    `<pre data-highlighted-lines=""><code class="language-css">mark {
  border-radius: var(--neeto-editor-rounded-sm);
  padding: 0px;
}

[data-type="mention"] {
  color: rgb(var(--neeto-editor-accent-800));
}</code></pre>`
  );

  return (
    <>
      <Editor
        initialValue={content}
        onChange={setContent}
        addons={[
          "highlight",
          "emoji",
          "code-block",
          "block-quote",
          "image-upload",
          "image-upload-unsplash",
          "video-upload",
          "video-embed",
          "paste-unformatted",
          "undo",
          "redo",
          "attachments",
          "table",
          "text-color",
        ]}
      />
      <EditorContent content={content} />
    </>
  );
};

export default EditorWithOverlayManager;
