const path = require("path");

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PeerDepsExternalsPlugin = require("peer-deps-externals-webpack-plugin");

module.exports = [
  {
    entry: "./lib/index.js",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: "file-loader",
            },
          ],
        },
        {
          test: /\.(sass|css|scss)$/,
          use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
        },
      ],
    },
    output: {
      path: `${__dirname}/build`,
      filename: "index.js",
      library: "neeto-editor",
      libraryTarget: "umd",
    },
    plugins: [new PeerDepsExternalsPlugin()],
    resolve: {
      extensions: [".json", ".js", ".jsx"],
      alias: {
        apis: path.resolve(__dirname, "/lib/apis"),
        components: path.resolve(__dirname, "/lib/components"),
        hooks: path.resolve(__dirname, "/lib/hooks"),
        constants: path.resolve(__dirname, "/lib/constants"),
        utils: path.resolve(__dirname, "/lib/utils"),
        neetoicons: "@bigbinary/neeto-icons",
        lib: path.resolve(__dirname, "/lib"),
      },
    },
  },
  {
    entry: {
      "editor-content": "./lib/styles/editor-output.scss",
    },
    module: {
      rules: [
        {
          test: /\.(sass|css|scss)$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
            "sass-loader",
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].min.css",
      }),
      new PeerDepsExternalsPlugin(),
    ],
    optimization: {
      minimizer: [new CssMinimizerPlugin()],
    },
    output: {
      path: `${__dirname}/dist`,
    },
  },
];
