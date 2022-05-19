import { useRef, useState, useEffect, useCallback, useMemo } from "react";

import { htmlToMarkdown, markdownToHtml, htmlToText } from "utils/markdown";

const useMarkdownEditor = ({ content, onUpdate, onSubmit, markdownMode }) => {
  const [editorState, setEditorState] = useState(() => {
    if (!content) return { content: "", length: 0 };
    const markdownContent = htmlToMarkdown(content);
    const textContent = htmlToText(content);
    return { content: markdownContent, length: textContent.length };
  });
  const inputFieldRef = useRef();
  const editorContentRef = useRef();
  editorContentRef.current = editorState.content;

  // imperative method to accept a html content and update the editor content with corresponding markdown
  const setContent = useCallback(
    htmlContent => {
      if (!inputFieldRef.current) return;
      const markdownContent = htmlToMarkdown(htmlContent);
      const textContent = htmlToText(htmlContent);
      setEditorState({ content: markdownContent, length: textContent.length });
      inputFieldRef.current.textContent = markdownContent;
    },
    [setEditorState]
  );

  const getHTML = useCallback(
    () => markdownToHtml(editorContentRef.current),
    [editorContentRef]
  );

  const getText = useCallback(() => {
    const htmlContent = getHTML();
    return htmlToText(htmlContent);
  }, [editorContentRef]);

  const handleChange = markdown => {
    const htmlContent = markdownToHtml(markdown);
    const textContent = htmlToText(htmlContent);
    setEditorState({ content: markdown, length: textContent.length });
    onUpdate({ markdown, html: htmlContent });
  };

  // Submit on Ctrl+Enter and Cmd+Enter
  const handleSubmit = useCallback(
    e => {
      if (!markdownMode) return;

      if (e.key !== "Enter" || !(e.metaKey || e.ctrlKey)) return;

      inputFieldRef.current?.blur();
      if (!onSubmit) return;
      const htmlContent = getHTML();
      onSubmit({ markdown: editorContentRef.current, html: htmlContent });
    },
    [editorContentRef, markdownMode]
  );

  // subscribe to onSubmit handlers
  useEffect(() => {
    document.addEventListener("keydown", handleSubmit);
    return () => {
      document.removeEventListener("keydown", handleSubmit);
    };
  }, [handleSubmit]);

  // set content value in the editor field on mount
  useEffect(() => {
    if (!inputFieldRef.current) return;
    inputFieldRef.current.textContent = editorContentRef.current;
  }, [inputFieldRef, editorContentRef]);

  const commands = useMemo(() => ({ setContent }), [setContent]);

  return {
    inputFieldRef,
    state: editorState,
    onChange: handleChange,
    isEmpty: editorState.length <= 0,
    getHTML,
    getText,
    commands,
  };
};

export default useMarkdownEditor;
