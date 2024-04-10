const path = require("path");
const commonResolve = require("@bigbinary/neeto-commons-frontend/configs/nanos/webpack/resolve.js");
const projectResolve = require("../resolve.js");
const { mergeDeepLeft } = require("ramda");
const remarkGfm = require("remark-gfm");

const { alias } = mergeDeepLeft(projectResolve, commonResolve);

module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)",
  ],

  addons: [
    "@storybook/addon-essentials",
    "@storybook/preset-scss",
    "storybook-dark-mode",
    {
      name: "@storybook/addon-postcss",
      options: {
        cssLoaderOptions: { importLoaders: 1 },
        postcssLoaderOptions: { implementation: require("postcss") },
      },
    },
    {
      name: "@storybook/addon-docs",
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],

  webpackFinal: async config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      ...alias,
      "@bigbinary/neeto-editor": path.resolve(
        __dirname,
        "../src/components"
      ),
    };

    // config.resolve.fallback = {
    //   ...config.resolve.fallback,
    //   crypto: require.resolve("crypto-browserify"),
    //   fs: false,
    //   http: require.resolve("stream-http"),
    //   https: require.resolve("https-browserify"),
    //   os: require.resolve("os-browserify/browser"),
    //   path: require.resolve("path-browserify"),
    //   stream: require.resolve("stream-browserify"),
    //   tty: require.resolve("tty-browserify"),
    //   zlib: require.resolve("browserify-zlib"),
    // };

    config.module.rules.find(
      rule => rule.test && rule.test.test(".svg")
    ).exclude = /^(?!.*\.storybook\/).*\.svg$/;

    config.module.rules.push({
      test: /\.svg$/,
      exclude: __dirname,
      enforce: "pre",
      loader: require.resolve("@svgr/webpack"),
    });

    config.module.rules.push({
      test: /\.js$/,
      include: /node_modules\/@bigbinary\/neeto-commons-frontend\/initializers/,
      use: { loader: "babel-loader", options: { plugins: ["preval"] } },
    });

    config.resolve.extensions.push(".svg");

    return config;
  },

  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
};
