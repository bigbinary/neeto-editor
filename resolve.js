const path = require("path");

module.exports = {
  alias: {
    common: path.resolve(__dirname, "./src/common"),
  },
  fallback: {
    util: require.resolve("util/"),
    url: require.resolve("url/"),
    fs: false,
    buffer: require.resolve("buffer/"),
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
  },
};
