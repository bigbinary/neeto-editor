const defaultConfigurations = require("@bigbinary/neeto-commons-frontend/configs/nanos/eslint/index.js");
const { mergeDeepLeft } = require("ramda");

module.exports = mergeDeepLeft(
  {
    extends: defaultConfigurations.extends,
    rules: {
      "import/extensions": "off",
    },
  },
  defaultConfigurations
);
