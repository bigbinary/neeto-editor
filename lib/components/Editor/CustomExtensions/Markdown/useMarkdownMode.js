import { useEffect, useRef, useState } from "react";

import { htmlToMarkdown, markdownToHtml } from "utils/markdown";

import { getMarkdownStyles } from "../../helpers";

const useMarkdownMode = ({
  editor,
  initialValue,
  onSubmit,
  strategy,
  style,
}) => {
  const [markdownStyles, setMarkdownStyles] = useState({});
  const [content, setContent] = useState(() =>
    htmlToMarkdown(editor?.getHTML() || initialValue)
  );
  const textareaRef = useRef();
  const contentRef = useRef(content);

  // Submit on Ctrl+Enter and Cmd+Enter
  const handleSubmit = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      onSubmit?.(markdownToHtml(contentRef.current));
      textareaRef.current.blur();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleSubmit);
    return () => {
      editor?.commands.setContent(markdownToHtml(contentRef.current));
      document.removeEventListener("keydown", handleSubmit);
    };
  }, []);

  useEffect(() => {
    contentRef.current = content;
    setMarkdownStyles(getMarkdownStyles({ strategy, style, textareaRef }));
  }, [content]);

  return { textareaRef, content, setContent, markdownStyles };
};

export default useMarkdownMode;
