const path = require("path");

const absolutePath = basePath => path.resolve(__dirname, `lib/${basePath}`);

module.exports = {
  // Don't modify any of the mandatory paths
  // START MANDATORY PATHS
  apis: absolutePath("apis"),
  assets: absolutePath("assets"),
  components: absolutePath("components"),
  common: absolutePath("common"),
  contexts: absolutePath("contexts"),
  hooks: absolutePath("hooks"),
  reducers: absolutePath("reducers"),
  routes: absolutePath("common/routes"),
  translations: absolutePath("translations"),
  utils: absolutePath("utils"),
  neetoicons: "@bigbinary/neeto-icons",
  // END MANDATORY PATHS
  // You can add project specific custom paths below:
  // START CUSTOM PATHS
  Common: absolutePath("components/Common"),
  urls: absolutePath("common/urls"),
  // END CUSTOM PATHS
};
