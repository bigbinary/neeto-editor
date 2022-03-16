import { useRef, useState, useEffect, useCallback, useMemo } from "react";

import { htmlToMarkdown, markdownToHtml } from "utils/markdown";

const useMarkdownEditor = ({ content, onUpdate, onSubmit }) => {
  const [editorContent, setEditorContent] = useState(content);
  const inputFieldRef = useRef();
  const editorContentRef = useRef();
  editorContentRef.current = editorContent;

  // Submit on Ctrl+Enter and Cmd+Enter
  const handleSubmit = useCallback(
    (e) => {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        if (onSubmit) onSubmit(editorContentRef.current);
        inputFieldRef.current?.blur();
      }
    },
    [editorContentRef]
  );

  const isEmpty = useCallback(
    () => !editorContentRef.current,
    [editorContentRef]
  );

  const setContent = useCallback(
    (htmlContent) => setEditorContent(htmlToMarkdown(htmlContent)),
    [setEditorContent]
  );

  const getHTML = useCallback(
    () => markdownToHtml(editorContentRef.current),
    [editorContentRef]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleSubmit);
    return () => {
      document.removeEventListener("keydown", handleSubmit);
    };
  }, [handleSubmit]);

  const onChange = ({ target: { value } }) => {
    setEditorContent(value);
    onUpdate(value);
  };

  const commands = useMemo(() => ({ setContent }), [setContent]);

  return {
    inputFieldRef,
    content: editorContent,
    onChange,
    isEmpty,
    getHTML,
    commands,
  };
};

export default useMarkdownEditor;
