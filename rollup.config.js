import path from "path";

import alias from "@rollup/plugin-alias";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import svgr from "@svgr/rollup";
import { mergeDeepLeft } from "ramda";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import styles from "rollup-plugin-styles";
import copy from "rollup-plugin-copy";
import cleaner from "rollup-plugin-cleaner";

import packageJson from "./package.json";

const commonResolve = require("@bigbinary/neeto-commons-frontend/configs/nanos/webpack/resolve.js");
const projectResolve = require("./resolves.js");

const { alias: aliasEntries } = mergeDeepLeft(projectResolve, commonResolve);
const peerDependencies = Object.keys(packageJson.peerDependencies);

const formats = ["esm", "cjs"];

const cleanerTargets = ["./dist/", "index.cjs.js", "index.js", "index.cjs.js.map", "index.js.map"];

const plugins = [
  peerDepsExternal(),
  alias({ entries: aliasEntries }),
  json(),
  svgr(),
  replace({
    "process.env.NODE_ENV": JSON.stringify("production"),
    preventAssignment: true,
  }),
  resolve({
    preferBuiltins: true,
    extensions: [".js", ".jsx", ".svg", ".json"],
    moduleDirectories: ["node_modules"],
  }),
  commonjs({ include: /\**node_modules\**/ }),
  babel({
    exclude: "node_modules/**",
    babelHelpers: "runtime",
  }),
  styles({
    extensions: [".css", ".scss", ".min.css"],
  }),
];

const config = args => {
  const destination = args.app
    ? path.resolve(__dirname, args.app, "node_modules", packageJson.name)
    : __dirname;
    const output = formats.map(format => ({
      assetFileNames: "[name][extname]",
      dir: path.join(destination),
      entryFileNames: format === "esm" ? "index.js" : "index.cjs.js",
      chunkFileNames: format === "esm" ? "dist/chunk-[hash].js" : "dist/chunk-[hash].cjs.js",
      format,
      name: "NeetoEditor",
      sourcemap: true,
    }));

  return [
    {
      input: "./src/index.js",
      external: peerDependencies,
      output,
      plugins: [
        cleaner({ targets: cleanerTargets }),
        ...plugins,
        args.app && copy({
          targets: [
            { src: "package.json", dest: destination },
            { src: "types.d.ts", dest: destination },
            { src: "LICENSE.md", dest: destination },
            {
              src: "src/translations",
              dest: path.join(destination, "src/translations"),
            },
          ],
        }),
      ].filter(Boolean),
    },
    {
      input: "./src/styles/editor-output.scss",
      output: {
        dir: `${__dirname}/dist`,
        format: "esm",
        sourcemap: true,
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
      input: "./src/components/EditorContent/codeBlockHighlight.js",
      output: {
        dir: `${__dirname}/dist`,
        format: "cjs",
        sourcemap: true,
        assetFileNames: "[name][extname]",
      },
      plugins,
    },
  ]
}

export default config;
