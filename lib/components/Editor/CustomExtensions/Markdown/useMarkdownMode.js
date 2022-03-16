import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { htmlToMarkdown, markdownToHtml } from "utils/markdown";

const useMarkdownMode = ({
  editor,
  initialValue,
  onSubmit,
  style,
  strategy,
}) => {
  const [content, setContent] = useState(() =>
    htmlToMarkdown(editor?.getHTML() || initialValue)
  );
  const textareaRef = useRef();
  const contentRef = useRef(content);
  const BORDER_HEIGHT = 1;

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
  }, [content]);

  // Auto resize textarea on content change
  useLayoutEffect(() => {
    textareaRef.current.style = style;
    strategy === "flexible" &&
      (textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 2 * BORDER_HEIGHT + "px");
  }, [content]);

  return { textareaRef, content, setContent };
};

export default useMarkdownMode;
