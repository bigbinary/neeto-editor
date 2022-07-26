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

export const getTextMenuOptions = ({ editor, setIsLinkOptionActive }) => [
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
    optionName: "code-block",
  },
  {
    Icon: Highlight,
    command: () => editor.chain().focus().toggleHighlight().run(),
    active: editor.isActive("highlight"),
    optionName: "highlight",
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
