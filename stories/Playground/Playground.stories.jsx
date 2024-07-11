import React from "react";

import { Example } from "storybook-addon-live-examples";

import { Editor } from "src";

import Playground from "./Playground.mdx";

const editorPlayGroundExample = `
  <Editor
    showImageInMention
    variables={[{ value: "VariableA", label: "Variable A" }]}
    addons={[
      "highlight",
      "emoji",
      "video-upload",
      "code-block",
      "block-quote",
      "image-upload",
      "image-upload-unsplash",
      "divider",
      "video-embed",
      "undo",
      "redo",
      "table",
      "attachments",
      "text-color",
      "paste-unformatted",
      "code",
    ]}
    mentions={[
      {
        name: "Oliver Smith",
        key: "oliver-smith",
        imageUrl: "https://i.pravatar.cc/299",
      },
      {
        name: "Eve Smith",
        key: "eve-smith",
        imageUrl: "https://i.pravatar.cc/300",
      },
      {
        name: "Sam Smith",
        key: "eve-smith",
        imageUrl: "https://i.pravatar.cc/302",
      },
    ]}
  />
`;

const EditorPlayground = () => (
  <Example
    expanded
    live
    code={editorPlayGroundExample}
    language="jsx"
    scope={{ Editor }}
  />
);

export default {
  title: "Editor playground",
  parameters: { docs: { page: Playground } },
};

export { EditorPlayground };
