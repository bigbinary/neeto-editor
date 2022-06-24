import { addons } from "@storybook/addons";
import neetoTheme from "./neetoTheme";
import favicon from "./public/favicon.ico";

addons.setConfig({
  theme: neetoTheme,
});

const link = document.createElement("link");
link.setAttribute("rel", "shortcut icon");
link.setAttribute("href", favicon);
document.head.appendChild(link);
