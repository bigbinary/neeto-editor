import React, { useEffect, useState } from "react";

import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import classNames from "classnames";
import { Down } from "neetoicons";
import CopyToClipboardButton from "neetomolecules/CopyToClipboardButton";
import { Dropdown, Input } from "neetoui";
import { isNil } from "ramda";
import { useTranslation } from "react-i18next";

import { SORTED_LANGUAGE_LIST } from "./constants";

const { Menu, MenuItem } = Dropdown;

const CodeBlockComponent = ({ node, editor, updateAttributes }) => {
  const [keyword, setKeyword] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    isNil(node.attrs?.language) && updateAttributes({ language: "plaintext" });
    node.attrs?.language === "javascriptreact" &&
      updateAttributes({ language: "javascript" });
  }, []);

  return (
    <NodeViewWrapper data-cy="neeto-editor-code-block">
      <pre>
        <div
          className={classNames("neeto-editor-codeblock-options", {
            "neeto-editor-codeblock-options--open": isDropdownOpen,
          })}
        >
          <Dropdown
            appendTo={() => document.body}
            buttonSize="small"
            buttonStyle="secondary"
            icon={Down}
            isOpen={isDropdownOpen}
            label={node.attrs?.language || t("neetoEditor.common.auto")}
            strategy="fixed"
            onClick={() => setIsDropdownOpen(isOpen => !isOpen)}
            onClose={() => setIsDropdownOpen(false)}
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
    </NodeViewWrapper>
  );
};

export default CodeBlockComponent;
