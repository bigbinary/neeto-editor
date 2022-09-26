import path from "path";

import alias from "@rollup/plugin-alias";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import styles from "rollup-plugin-styles";
import { terser } from "rollup-plugin-terser";

const plugins = [
  peerDepsExternal(),
  alias({
    entries: {
      apis: path.resolve(__dirname, "lib/apis"),
      components: path.resolve(__dirname, "lib/components"),
      hooks: path.resolve(__dirname, "lib/hooks"),
      constants: path.resolve(__dirname, "lib/constants"),
      utils: path.resolve(__dirname, "lib/utils"),
      neetoicons: "@bigbinary/neeto-icons",
      lib: path.resolve(__dirname, "lib"),
    },
  }),
  replace({
    "process.env.NODE_ENV": JSON.stringify("production"),
    preventAssignment: true,
  }),
  resolve({
    browser: true,
    preferBuiltins: true,
    extensions: [".js", ".jsx", ".svg"],
  }),
  commonjs({ include: /\**node_modules\**/ }),
  babel({
    exclude: /node_modules/,
    extensions: [".jsx", ".js"],
    presets: ["@babel/preset-env", "@babel/preset-react"],
    plugins: ["@babel/plugin-transform-runtime"],
    babelHelpers: "runtime",
  }),
  styles({
    extensions: [".css", ".scss", ".min.css"],
  }),
  terser({ compress: { evaluate: false } }),
];

export default [
  {
    input: "./lib/index.js",
    output: {
      file: "build/index.js",
      format: "esm",
      sourcemap: false,
      name: "neetoEditor",
      assetFileNames: "[name][extname]",
    },
    plugins,
  },
  {
    input: "./lib/styles/editor-output.scss",
    output: {
      dir: `${__dirname}/dist`,
      format: "esm",
      assetFileNames: "[name][extname]",
    },
    plugins: [
      styles({
        extensions: [".css", ".scss", ".min.css"],
        mode: ["extract", "editor-content.min.css"],
        minimize: true,
      }),
    ],
  },
  {
    input: "./lib/utils/codeBlockHighlight.js",
    output: {
      dir: `${__dirname}/dist`,
      format: "cjs",
      sourcemap: false,
      assetFileNames: "[name][extname]",
    },
    plugins,
  },
];
