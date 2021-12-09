import React from "react";
import Tab from "../../../Common/Tab";

const MarkdownTabSwitcher = ({ isMarkdownTab, setIsMarkdownTab }) => {
  return (
    <div className="flex">
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
