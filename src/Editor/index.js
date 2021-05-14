import React, { forwardRef } from "react";
import { useEditor, EditorContent, FloatingMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Typography from "@tiptap/extension-typography";

const Tiptap = (props, ref) => {
  const editor = useEditor({
    extensions: props.extensions || [StarterKit, Typography],
    content: "<p>Hello World! 🌎️</p>",
    injectCSS: false,
  });

  /* Make editor object available to the parent */
  React.useImperativeHandle(ref, () => ({
    editor: editor,
  }));

  return (
    <>
      {editor && (
        <FloatingMenu editor={editor}>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "is-active" : ""
            }
          >
            H1
          </button>
        </FloatingMenu>
      )}
      <EditorContent editor={editor} />
    </>
  );
};

export default React.forwardRef(Tiptap);
