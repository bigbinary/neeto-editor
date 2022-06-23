export const EDITOR_ADDONS_TABLE_COLUMNS = ["Prop", "Description"];

export const EDITOR_ADDONS_TABLE_ROWS = [
  ["highlight", "Emphasize important texts by marking it with a color."],
  ["emoji", "Add emojis to your content using an emoji picker."],
  ["code-block", "Provide syntax highlighting for code snippets."],
  ["block-quote", "Highlight a block of text as a quote."],
  ["image-upload", "Upload images to the editor."],
  ["image-upload-unsplash", "Add unsplash integration to the image upload."],
  ["divider", "Add a horizontal line to separate different sections."],
  ["video-embed", "Embed videos from YouTube and Vimeo."],
];

export const EDITOR_PROP_TABLE_COLUMNS = [
  "Prop",
  "Description",
  "Sample Value",
];

export const EDITOR_CONTENT_PROP_TABLE_ROWS = [
  [
    "content",
    "Accepts a valid HTML string. Can pass the output of the editor directly.",
    `"<p>Hello World</p"`,
  ],
  [
    "className",
    "Accepts a string value. Can be used for further customisation of the editor content.",
    `"neeto-editor-content"`,
  ],
];

export const EDITOR_SHORTCUTS_TABLE_COLUMNS = [
  "Command",
  "Windows/Linux",
  "macOS",
];

export const EDITOR_SHORTCUTS_TABLE_ROWS = [
  ["Bold", "Ctrl + B", "Cmd + B"],
  ["Italicize", "Ctrl + I", "Cmd + I"],
  ["Underline", "Ctrl + U", "Cmd + U"],
  ["Strikethrough", "Ctrl + Shift + X", "Cmd + Shift + X"],
  ["Highlight", "Ctrl + Shift + H", "Cmd + Shift + H"],
  ["Ordered List", "Ctrl + Shift + 7", "Cmd + Shift + 7"],
  ["Bullet List", "Ctrl + Shift + 8", "Cmd + Shift + 8"],
  ["Blockquote", "Ctrl + Shift + B", "Cmd + Shift + B"],
];
