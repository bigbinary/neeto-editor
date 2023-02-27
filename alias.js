const path = require("path");

const absolutePath = basePath => path.resolve(__dirname, `src/${basePath}`);

module.exports = {
  src: absolutePath(""),
  apis: absolutePath("apis"),
  assets: absolutePath("assets"),
  components: absolutePath("components"),
  common: absolutePath("common"),
  contexts: absolutePath("contexts"),
  hooks: absolutePath("hooks"),
  reducers: absolutePath("reducers"),
  stores: absolutePath("stores"),
  utils: absolutePath("utils"),
  neetocommons: "@bigbinary/neeto-commons-frontend",
  neetoicons: "@bigbinary/neeto-icons",
  neetoui: "@bigbinary/neetoui",
};
