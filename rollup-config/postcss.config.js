const postcss = require("rollup-plugin-postcss");

module.exports = postcss({
  plugins: [
    require("postcss-css-variables")({
      preserve: false,
      variables: {
        "--neeto-ui-black": "224, 224, 224",
        "--neeto-ui-primary-800": "0, 123, 255",
        "--neeto-ui-font-semibold": "600",
        "--neeto-ui-text-h1": "32px",
        "--neeto-ui-text-h2": "28px",
        "--neeto-ui-text-h3": "24px",
        "--neeto-ui-text-h4": "20px",
        "--neeto-ui-text-h5": "16px",
        "--neeto-ui-text-h6": "14px",
        "--neeto-ui-text-body1": "16px",
        "--neeto-ui-font-normal": "400",
        "--neeto-ui-leading-normal": "1.5",
        "--neeto-ui-gray-100": "240, 240, 240",
        "--neeto-ui-gray-300": "200, 200, 200",
        "--neeto-ui-rounded-sm": "4px",
        "--neeto-ui-rounded-lg": "8px",
        "--neeto-ui-gray-600": "120, 120, 120",
        "--neeto-ui-gray-500": "150, 150, 150",
        "--neeto-ui-white": "255, 255, 255",
      },
    }),
  ],
  extract: true,
});
