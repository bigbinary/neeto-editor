import { useEffect, useRef, useState } from "react";

import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import { noop } from "neetocist";
import { Down } from "neetoicons";
import CopyToClipboardButton from "neetomolecules/CopyToClipboardButton";
import { Dropdown, Input } from "neetoui";
import { useTranslation } from "react-i18next";

import { SORTED_LANGUAGE_LIST } from "./constants";
import { handleCodeBlockVisibility } from "./utils";

const { Menu, MenuItem } = Dropdown;

const CodeBlockComponent = ({ node, editor, updateAttributes, extension }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [keyword, setKeyword] = useState("");

  const ref = useRef();

  const { t } = useTranslation();

  const filteredAndSortedLanguageList = SORTED_LANGUAGE_LIST.filter(language =>
    language.includes(keyword)
  );

  const handleLanguageSelect = language => {
    updateAttributes({ language });
    setKeyword("");
    editor?.commands?.focus();
  };

  useEffect(() => {
    const container = ref.current;
    const shouldSetObserver =
      extension.options?.enableReactNodeViewOptimization;
    if (!shouldSetObserver) return noop;

    const observer = new IntersectionObserver(
      entries => {
        handleCodeBlockVisibility({ entries, setIsVisible });
      },
      {
        rootMargin: "-10% 0% -10% 0%",
        root: document.getElementById("neeto-editor-wrapper"),
      }
    );

    if (container) setTimeout(() => observer.observe(container), 0);

    return () => {
      if (container && shouldSetObserver) observer.unobserve(container);
    };
  }, []);

  const handleContentMount = node => {
    if (ref.current && node?.offsetHeight) {
      ref.current.style.minHeight = `${node.offsetHeight}px`;
    }
  };

  return (
    <NodeViewWrapper data-cy="neeto-editor-code-block">
      <div {...{ ref }}>
        {isVisible && (
          <pre ref={handleContentMount}>
            <div
              className="neeto-editor-codeblock-options"
              contentEditable={false}
            >
              <Dropdown
                appendTo={() => document.body}
                buttonSize="small"
                buttonStyle="secondary"
                icon={Down}
                label={node.attrs?.language || t("neetoEditor.common.auto")}
                strategy="fixed"
                zIndex={99999}
              >
                <Input
                  autoFocus
                  className="neeto-editor-codeblock-options__input"
                  placeholder={t("neetoEditor.placeholders.searchLanguages")}
                  size="small"
                  value={keyword}
                  onChange={e => setKeyword(e.target.value)}
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                />
                <Menu className="neeto-editor-codeblock-options__menu">
                  {filteredAndSortedLanguageList.map(language => (
                    <MenuItem.Button
                      key={language}
                      onClick={() => handleLanguageSelect(language)}
                    >
                      {language || t("neetoEditor.common.auto")}
                    </MenuItem.Button>
                  ))}
                </Menu>
              </Dropdown>
              <CopyToClipboardButton
                size="small"
                style="secondary"
                value={node?.content?.content[0]?.text}
              />
            </div>
            <NodeViewContent as="code" />
          </pre>
        )}
      </div>
    </NodeViewWrapper>
  );
};

export default CodeBlockComponent;
