const HtmlWebPackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const path = require("path");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  mode: isDevelopment ? "development" : "production",
  entry: "./example/index.js",
  devtool:
    process.env.NODE_ENV === "production"
      ? "source-map"
      : "cheap-module-eval-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [isDevelopment && "react-refresh/babel"].filter(Boolean),
          },
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
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          "postcss-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  output: {
    path: __dirname + "/build",
    publicPath: "/",
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),
    isDevelopment && new ReactRefreshWebpackPlugin({ overlay: false }),
  ].filter(Boolean),
  resolve: {
    alias: {
      components: path.resolve(__dirname, "/lib/components"),
      hooks: path.resolve(__dirname, "/lib/hooks"),
      constants: path.resolve(__dirname, "/lib/constants"),
      utils: path.resolve(__dirname, "/lib/utils"),
    },
  },
};
