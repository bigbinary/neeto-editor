import alias from "@rollup/plugin-alias";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import svgr from "@svgr/rollup";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import styles from "rollup-plugin-styles";
import { terser } from "rollup-plugin-terser";

import packageJson from "./package.json";

const peerDependencies = Object.keys(packageJson.peerDependencies);

const plugins = [
  peerDepsExternal(),
  alias({ entries: require("./alias") }),
  json(),
  svgr(),
  replace({
    "process.env.NODE_ENV": JSON.stringify("production"),
    preventAssignment: true,
  }),
  resolve({
    preferBuiltins: true,
    extensions: [".js", ".jsx", ".svg", ".json", ".ts"],
    moduleDirectories: ["node_modules"],
  }),
  commonjs({ include: /\**node_modules\**/ }),
  babel({
    exclude: "node_modules/**",
    presets: ["@babel/preset-env", "@babel/preset-react"],
    plugins: [
      "@babel/plugin-transform-runtime",
      "@babel/plugin-proposal-nullish-coalescing-operator",
      "@babel/plugin-proposal-class-properties",
      "ramda",
    ],
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
    external: peerDependencies,
    output: {
      file: "./index.js",
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
    input: "./lib/components/EditorContent/codeBlockHighlight.js",
    output: {
      dir: `${__dirname}/dist`,
      format: "cjs",
      sourcemap: false,
      assetFileNames: "[name][extname]",
    },
    plugins,
  },
];
