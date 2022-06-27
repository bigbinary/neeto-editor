import "../lib/index.scss";
import "./style.scss";

export const parameters = {
  layout: "fullscreen",
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: [
        "Welcome",
        "Getting started",
        "Changelog",
        "Walkthroughs",
        "API Reference",
        ["Props", "Editor API"],
        "Examples",
        [
          "Basic",
          "Customize options",
          ["Addons", "Override defaults", "Custom slash commands"],
        ],
        "Accessibility",
      ],
    },
  },
};
