module.exports = {
  core: {
    builder: "webpack5",
  },
  staticDirs: ["./public"],
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-postcss",
    "@storybook/preset-scss",
  ],
  framework: "@storybook/react",
  babel: async options => ({
    ...options,
    plugins: ["@babel/plugin-proposal-class-properties"],
  }),
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = require("../alias");
    return config;
  },
};
