import React from "react";

import { Editor } from "../../lib";

export default {
  title: "Examples/Basic",
  component: Editor,
  parameters: {
    layout: "padded",
  },
};

export const Basic = () => <Editor autoFocus />;
