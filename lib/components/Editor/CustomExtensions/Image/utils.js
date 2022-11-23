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

export const buildImageOptions = editor => [
  {
    Icon: LeftAlign,
    command: () => editor.chain().focus().setImage({ align: "left" }).run(),
    active: editor.isActive("image", { align: "left" }),
    optionName: "Align left",
  },
  {
    Icon: CenterAlign,
    command: () => editor.chain().focus().setImage({ align: "center" }).run(),
    active: editor.isActive("image", { align: "center" }),
    optionName: "Align Center",
  },
  {
    Icon: RightAlign,
    command: () => editor.chain().focus().setImage({ align: "right" }).run(),
    active: editor.isActive("image", { align: "center" }),
    optionName: "Align right",
  },
];
