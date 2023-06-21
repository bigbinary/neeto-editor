import React, { useState } from "react";

import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import { copyToClipboard } from "neetocommons/utils";
import { Copy, Down } from "neetoicons";
import { Button, Dropdown, Input } from "neetoui";
import { useTranslation } from "react-i18next";

import { SORTED_LANGUAGE_LIST } from "./constants";

const { Menu, MenuItem } = Dropdown;

const CodeBlockComponent = ({ node, updateAttributes }) => {
  const [keyword, setKeyword] = useState("");

  const { t } = useTranslation();

  const filteredAndSortedLanguageList = SORTED_LANGUAGE_LIST.filter(language =>
    language.includes(keyword)
  );

  const handleCopyClick = () => {
    copyToClipboard(node?.content?.content[0]?.text);
  };

  const handleLanguageSelect = language => {
    updateAttributes({ language: language === "auto" ? null : language });
    setKeyword("");
  };

  return (
    <NodeViewWrapper data-cy="neeto-editor-code-block">
      <pre>
        <div className="neeto-editor-codeblock-options">
          <Dropdown
            buttonSize="small"
            buttonStyle="secondary"
            closeOnOutsideClick={false}
            icon={Down}
            label={node.attrs?.language || "auto"}
          >
            <Input
              autoFocus
              className="neeto-editor-codeblock-options__input"
              placeholder={t("placeholders.searchLanguages")}
              prefix={<s />}
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
                  {language || "auto"}
                </MenuItem.Button>
              ))}
            </Menu>
          </Dropdown>
          <Button
            icon={Copy}
            size="small"
            style="secondary"
            onClick={handleCopyClick}
          />
        </div>
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  );
};

export default CodeBlockComponent;
