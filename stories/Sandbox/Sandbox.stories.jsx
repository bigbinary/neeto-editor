import React from "react";

import { Example } from "storybook-addon-live-examples";

import { Editor } from "src";

import Playground from "./Sandbox.mdx";
import "./sandbox.scss";

const editorSandboxExample = `
<Editor
  showImageInMention
  variables={[{ value: "VariableA", label: "Variable A" }]}
  addons={["highlight"]}
  mentions={[
    {
      name: "Oliver Smith",
      key: "oliver-smith",
      imageUrl: "https://i.pravatar.cc/299",
    },
  ]}
/>
`;

const EditorSandbox = () => (
  <div className="editor-sandbox-container p-6">
    <script>
      {(() => {
        setTimeout(() => {
          document
            .getElementsByClassName(
              "npm__react-simple-code-editor__textarea"
            )[0]
            ?.focus?.();
        }, 300);
      })()}
    </script>
    <Example
      desktopOnly
      expanded
      live
      code={editorSandboxExample}
      language="jsx"
      scope={{ Editor }}
    />
  </div>
);

export default {
  title: "Sandbox",
  parameters: { docs: { page: Playground } },
};

export { EditorSandbox };
