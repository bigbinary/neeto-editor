import {
  TextBold,
  TextItalic,
  Underline,
  TextCross,
  Link,
  Code,
  Highlight,
  CenterAlign,
  LeftAlign,
  RightAlign,
  Edit,
  Close,
} from "neetoicons";
import { prop } from "ramda";

export const getTextMenuDefaultOptions = ({
  editor,
  setIsLinkOptionActive,
}) => [
  {
    Icon: TextBold,
    command: () => editor.chain().focus().toggleBold().run(),
    active: editor.isActive("bold"),
    optionName: "bold",
  },
  {
    Icon: TextItalic,
    command: () => editor.chain().focus().toggleItalic().run(),
    active: editor.isActive("italic"),
    optionName: "italic",
  },
  {
    Icon: Underline,
    command: () => editor.chain().focus().toggleUnderline().run(),
    active: editor.isActive("underline"),
    optionName: "underline",
  },
  {
    Icon: TextCross,
    command: () => editor.chain().focus().toggleStrike().run(),
    active: editor.isActive("strike"),
    optionName: "strike",
  },
  {
    Icon: Link,
    command: () => setIsLinkOptionActive(true),
    active: editor.isActive("link"),
    optionName: "link",
  },
  {
    Icon: Code,
    command: () => editor.chain().focus().toggleCode().run(),
    active: editor.isActive("code"),
    optionName: "code",
  },
  {
    Icon: Highlight,
    command: () => editor.chain().focus().toggleHighlight().run(),
    active: editor.isActive("highlight"),
    optionName: "highlight",
  },
];

export const getTextMenuDropdownOptions = ({ editor }) => [
  {
    optionName: "Heading 1",
    active: editor.isActive("heading", { level: 1 }),
    command: () =>
      editor.chain().focus().setNode("heading", { level: 1 }).run(),
  },
  {
    optionName: "Heading 2",
    active: editor.isActive("heading", { level: 2 }),
    command: () =>
      editor.chain().focus().setNode("heading", { level: 2 }).run(),
  },
  {
    optionName: "Heading 3",
    active: editor.isActive("heading", { level: 3 }),
    command: () =>
      editor.chain().focus().setNode("heading", { level: 3 }).run(),
  },
  {
    optionName: "Ordered List",
    active: editor.isActive("orderedList"),
    command: () => editor.chain().focus().toggleOrderedList().run(),
  },
  {
    optionName: "Bulleted List",
    active: editor.isActive("bulletList"),
    command: () => editor.chain().focus().toggleBulletList().run(),
  },
  {
    optionName: "Paragraph",
    active: editor.isActive("paragraph"),
    command: () => editor.chain().focus().setNode("paragraph").run(),
  },
];

export const getImageMenuOptions = ({
  editor,
  isImageEditorModalOpen,
  setIsImageEditorModalOpen,
}) => [
  {
    Icon: LeftAlign,
    command: () =>
      editor
        .chain()
        .focus()
        .setImageAttributes({
          float: "left",
          align: "none",
        })
        .run(),
    active: editor.isActive("image", {
      float: "left",
      align: "none",
    }),
    optionName: "Float Left",
  },
  {
    Icon: CenterAlign,
    command: () =>
      editor
        .chain()
        .focus()
        .setImageAttributes({
          float: "none",
          align: "center",
        })
        .run(),
    active: editor.isActive("image", {
      float: "none",
      align: "center",
    }),
    optionName: "Align Center",
  },
  {
    Icon: RightAlign,
    command: () =>
      editor
        .chain()
        .focus()
        .setImageAttributes({
          float: "right",
          align: "none",
        })
        .run(),
    active: editor.isActive("image", {
      float: "right",
      align: "center",
    }),
    optionName: "Float Right",
  },
  {
    Icon: Edit,
    command: () => setIsImageEditorModalOpen(true),
    active: isImageEditorModalOpen,
    optionName: "Caption",
  },
  {
    Icon: Close,
    command: () => editor.commands.deleteSelection(),
    active: false,
    optionName: "Remove",
  },
];

export const getNodeType = options =>
  options.find(prop("active"))?.optionName || "Paragraph";
