import { t } from "i18next";
import { LeftAlign, CenterAlign, RightAlign, Delete } from "neetoicons";

export const convertToFileSize = (size = 10 * 1024 * 1024) => {
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  while (size >= 1024 && i < units.length) {
    size /= 1024;
    ++i;
  }

  return `${size.toFixed(1)} ${units[i]}`;
};

export const buildImageOptions = () => [
  {
    Icon: LeftAlign,
    alignPos: "left",
    optionName: t("neetoEditor.menu.alignLeft"),
  },
  {
    Icon: CenterAlign,
    alignPos: "center",
    optionName: t("neetoEditor.menu.alignCenter"),
  },
  {
    Icon: RightAlign,
    alignPos: "right",
    optionName: t("neetoEditor.menu.alignRight"),
  },
  { Icon: Delete, optionName: t("neetoEditor.menu.delete") },
];
