import { t } from "i18next";

import MenuButton from "./components/Button";
import EmojiOption from "./components/EmojiOption";
import FontSizeOption from "./components/FontSizeOption";
import TableOption from "./components/TableOption";
import TextColorOption from "./components/TextColorOption";

import Mentions from "../../CustomExtensions/Mention";

export const FONT_SIZE_OPTIONS = [
  { label: t("neetoEditor.menu.heading1"), value: 1, key: "h1" },
  { label: t("neetoEditor.menu.heading2"), value: 2, key: "h2" },
  { label: t("neetoEditor.menu.heading3"), value: 3, key: "h3" },
  { label: t("neetoEditor.menu.heading4"), value: 4, key: "h4" },
  { label: t("neetoEditor.menu.heading5"), value: 5, key: "h5" },
  { label: t("neetoEditor.menu.normalText"), value: 0, key: "body2" },
];

export const MENU_ELEMENT_TYPES = {
  BUTTON: "button",
  FONT_SIZE: "fontSize",
  TABLE: "table",
  TEXT_COLOR: "textColor",
  EMOJI: "emoji",
  MENTIONS: "mentions",
};

export const MENU_TYPES = {
  HISTORY: "history",
  FONT: "font",
  LIST: "list",
  BLOCK: "block",
  MISC: "misc",
  EXTRAS: "extras",
  CUSTOM: "custom",
};

export const MENU_ELEMENTS = {
  [MENU_ELEMENT_TYPES.BUTTON]: MenuButton,
  [MENU_ELEMENT_TYPES.FONT_SIZE]: FontSizeOption,
  [MENU_ELEMENT_TYPES.TABLE]: TableOption,
  [MENU_ELEMENT_TYPES.TEXT_COLOR]: TextColorOption,
  [MENU_ELEMENT_TYPES.EMOJI]: EmojiOption,
  [MENU_ELEMENT_TYPES.MENTIONS]: Mentions,
};

export const MENU_ELEMENT_WIDTHS = {
  [MENU_ELEMENT_TYPES.BUTTON]: 36,
  [MENU_ELEMENT_TYPES.FONT_SIZE]: 103,
  [MENU_ELEMENT_TYPES.TABLE]: 36,
  [MENU_ELEMENT_TYPES.TEXT_COLOR]: 36,
  [MENU_ELEMENT_TYPES.EMOJI]: 36,
  [MENU_ELEMENT_TYPES.MENTIONS]: 36,
};
