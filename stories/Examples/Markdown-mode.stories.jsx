import React, { useState } from "react";
import {
  Meta,
  Story,
  Canvas,
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Stories,
} from "@storybook/addon-docs";
import { Down } from "neetoicons";
import Dropdown from "../../lib/components/Common/Dropdown";
import CustomDescription from "../../example/components/Description";
import HighlightText from "../../example/components/HighlightText";
import { Editor } from "../../lib";

export default {
  title: "Examples/Markdown Mode",
  component: Editor,
  parameters: {
    layout: "padded",
    previewTabs: {
      canvas: {
        hidden: true,
      },
    },
    docs: {
      page: () => (
        <>
          <Title />
          <Primary />
          <CustomDescription>
            Neeto Editor comes with a markdown mode where users can type the
            content in markdown, which gets converted to the default rich text
            and vice versa. The markdown mode can be enabled by passing a truthy
            value to the <HighlightText>markdownMode</HighlightText> prop.
          </CustomDescription>
        </>
      ),
    },
    viewMode: "docs",
  },
};

export const MarkdownMode = () => {
  const [isMarkdownModeActive, setIsMarkdownModeActive] = useState(false);

  return (
    <div className="flex flex-col flex-1 ml-auto">
      <Dropdown
        className="ml-auto"
        customTarget={() => (
          <div className="flex items-center px-2 py-1 space-x-2 transition-colors duration-100 bg-gray-200 rounded-sm cursor-pointer hover:bg-gray-300">
            <p> {isMarkdownModeActive ? "Markdown" : "Rich Text"}</p>
            <Down size={18} />
          </div>
        )}
      >
        <li onClick={() => setIsMarkdownModeActive(false)}>Rich Text</li>
        <li onClick={() => setIsMarkdownModeActive(true)}>Markdown</li>
      </Dropdown>
      <Editor markdownMode={isMarkdownModeActive} menuType="bubble" />
    </div>
  );
};
