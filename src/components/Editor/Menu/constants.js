import { t } from "i18next";

import BubbleMenu from "./Bubble";
import EmptyMenu from "./EmptyMenu";
import FixedMenu from "./Fixed";
import HeadlessMenu from "./Headless";

export const FONT_SIZE_OPTIONS = [
  { label: t("neetoEditor.menu.heading1"), value: 1, key: "h1" },
  { label: t("neetoEditor.menu.heading2"), value: 2, key: "h2" },
  { label: t("neetoEditor.menu.heading3"), value: 3, key: "h3" },
  { label: t("neetoEditor.menu.heading4"), value: 4, key: "h4" },
  { label: t("neetoEditor.menu.heading5"), value: 5, key: "h5" },
  { label: t("neetoEditor.menu.normalText"), value: 0, key: "body2" },
];

export const MENU_COMPONENTS = {
  fixed: FixedMenu,
  bubble: BubbleMenu,
  headless: HeadlessMenu,
  none: EmptyMenu,
};
