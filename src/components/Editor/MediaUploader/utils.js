import { t } from "i18next";
import { LeftAlign, CenterAlign, RightAlign, Delete } from "neetoicons";

export const convertToFileSize = size => {
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
    optionName: t("menu.alignLeft"),
  },
  {
    Icon: CenterAlign,
    alignPos: "center",
    optionName: t("menu.alignCenter"),
  },
  {
    Icon: RightAlign,
    alignPos: "right",
    optionName: t("menu.alignRight"),
  },
  {
    Icon: Delete,
    optionName: t("menu.delete"),
  },
];
