const fs = require("fs");
const path = require("path");

const buildPathGroupsBasedOnWebpackAliases = ({
  customJSRoot = "",
  customAliasPath = "alias.js",
}) => {
  const rootOfProject = path.resolve(__dirname + `/../../`);

  const isFile = filePath =>
    fs.existsSync(filePath) && fs.lstatSync(filePath).isFile();

  const webpackAliasPath = path.resolve(rootOfProject, customAliasPath);

  const hasWebpackAliasConfig = isFile(webpackAliasPath);

  const emptyPathGroups = [];

  if (!hasWebpackAliasConfig) return emptyPathGroups;

  const alias = require(webpackAliasPath);

  const railsJSFilesRoot = path.resolve(rootOfProject + customJSRoot);

  const pathGroups = Object.entries(alias).map(([name, path]) => {
    // sometimes alias might be already resolved to full absolute path
    const isAleadyAnAbsolutePath =
      path.includes("cypress-tests/") || path.includes("app/");

    const absolutePath = isAleadyAnAbsolutePath
      ? path
      : `${railsJSFilesRoot}${path}`;
    const wildCard =
      isFile(absolutePath + ".js") || isFile(absolutePath + ".jsx")
        ? ""
        : "/**";

    let group = "internal";
    if (name === "neetoicons") {
      group = "external";
    }

    return { pattern: `${name}${wildCard}`, group };
  });

  return pathGroups;
};

module.exports = { buildPathGroupsBasedOnWebpackAliases };
