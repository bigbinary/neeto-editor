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

import { Editor } from "../../lib";
import Dropdown from "../../lib/components/Common/Dropdown";

export default {
  title: "Examples/Markdown mode",
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
          <div>
            neetoEditor comes with a markdown mode where users can type the
            content in markdown, which gets converted to the default rich text
            and vice versa. The markdown mode can be enabled by passing a truthy
            value to the `markdownMode` prop.
          </div>
        </>
      ),
    },
    viewMode: "docs",
  },
};

export const MarkdownMode = () => {
  const [isMarkdownModeActive, setIsMarkdownModeActive] = useState(false);

  return (
    <div className="ml-auto flex flex-1 flex-col">
      <Dropdown
        className="ml-auto"
        customTarget={() => (
          <div className="flex cursor-pointer items-center space-x-2 rounded-sm bg-gray-200 px-2 py-1 transition-colors duration-100 hover:bg-gray-300">
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
