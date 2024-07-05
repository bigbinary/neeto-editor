const postcss = require("rollup-plugin-postcss");

module.exports = postcss({
  plugins: [
    require("postcss-css-variables")({
      preserve: false,
      variables: {
        "--neeto-ui-black": "12,17,29",
        "--neeto-ui-primary-800": "0, 102, 83",
        "--neeto-ui-font-semibold": "600",
        "--neeto-ui-text-h1": "2.25rem",
        "--neeto-ui-text-h2": "1.75rem",
        "--neeto-ui-text-h3": "1.25rem",
        "--neeto-ui-text-h4": "1rem",
        "--neeto-ui-text-h5": "0.875rem",
        "--neeto-ui-text-h6": "0.75rem",
        "--neeto-ui-text-body1": "1rem",
        "--neeto-ui-font-normal": "400",
        "--neeto-ui-leading-normal": "1.5",
        "--neeto-ui-gray-100": "246, 247, 248",
        "--neeto-ui-gray-300": "216, 220, 222",
        "--neeto-ui-rounded-sm": "3px",
        "--neeto-ui-rounded-lg": "8px",
        "--neeto-ui-gray-600": "52, 64, 84",
        "--neeto-ui-gray-500": "135, 146, 157",
        "--neeto-ui-white": "255, 255, 255",
      },
    }),
  ],
  extract: true,
});
