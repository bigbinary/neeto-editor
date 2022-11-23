import { LeftAlign, CenterAlign, RightAlign } from "neetoicons";

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
    optionName: "Align left",
  },
  {
    Icon: CenterAlign,
    alignPos: "center",
    optionName: "Align Center",
  },
  {
    Icon: RightAlign,
    alignPos: "right",
    optionName: "Align right",
  },
];
