const commonResolve = require("@bigbinary/neeto-commons-frontend/configs/nanos/webpack/resolve.js");
const projectResolve = require("../resolve.js");
const { mergeDeepLeft } = require("ramda");

const { alias } = mergeDeepLeft(projectResolve, commonResolve);

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
    "storybook-dark-mode",
  ],
  framework: "@storybook/react",
  babel: async options => ({
    ...options,
    plugins: ["@babel/plugin-proposal-class-properties"],
  }),
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = alias;
    return config;
  },
};
