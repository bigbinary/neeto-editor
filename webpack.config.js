const PeerDepsExternalsPlugin = require("peer-deps-externals-webpack-plugin");

module.exports = {
  entry: "./src/Editor/index.js",
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
    path: __dirname,
    filename: "index.js",
    library: "neeto-editor",
    libraryTarget: "umd",
  },
  plugins: [new PeerDepsExternalsPlugin()],
};
