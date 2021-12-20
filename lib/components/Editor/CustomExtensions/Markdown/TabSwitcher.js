import React from "react";
import Tab from "components/Common/Tab";

const MarkdownTabSwitcher = ({ isMarkdownTab, setIsMarkdownTab }) => {
  return (
    <div className="neeto-editor-markdown-tabswitcher">
      <Tab>
        <Tab.Item
          active={!isMarkdownTab}
          onClick={() => setIsMarkdownTab(false)}
        >
          Rich Text
        </Tab.Item>
        <Tab.Item active={isMarkdownTab} onClick={() => setIsMarkdownTab(true)}>
          Markdown
        </Tab.Item>
      </Tab>
    </div>
  );
};

export default MarkdownTabSwitcher;
