const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./example/index.js",
  devtool: process.env.NODE_ENV === "production" ? false : "source-map",
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
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),
  ],
  resolve: {
    alias: {
      components: path.resolve(__dirname, "/lib/components"),
      hooks: path.resolve(__dirname, "/lib/hooks"),
      constants: path.resolve(__dirname, "/lib/constants"),
      utils: path.resolve(__dirname, "/lib/utils"),
    },
  },
};
