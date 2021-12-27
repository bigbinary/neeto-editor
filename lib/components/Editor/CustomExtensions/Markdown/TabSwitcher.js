import React from "react";
import Tab from "components/Common/Tab";

const MarkdownTabSwitcher = ({
  isMarkdownTabActive,
  setIsMarkdownTabActive,
}) => {
  return (
    <div className="neeto-editor-markdown-tabswitcher">
      <Tab>
        <Tab.Item
          active={!isMarkdownTabActive}
          onClick={() => setIsMarkdownTabActive(false)}
        >
          Rich Text
        </Tab.Item>
        <Tab.Item
          active={isMarkdownTabActive}
          onClick={() => setIsMarkdownTabActive(true)}
        >
          Markdown
        </Tab.Item>
      </Tab>
    </div>
  );
};

export default MarkdownTabSwitcher;
