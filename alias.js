const path = require("path");

const absolutePath = basePath => path.resolve(__dirname, `lib/${basePath}`);

module.exports = {
  apis: absolutePath("apis"),
  assets: absolutePath("assets"),
  components: absolutePath("components"),
  common: absolutePath("common"),
  contexts: absolutePath("contexts"),
  hooks: absolutePath("hooks"),
  reducers: absolutePath("reducers"),
  stores: absolutePath("stores"),
  utils: absolutePath("utils"),
  neetoicons: "@bigbinary/neeto-icons",
};
