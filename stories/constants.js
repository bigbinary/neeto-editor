export const EDITOR_ADDONS_TABLE_COLUMNS = ["Prop", "Description"];

export const EDITOR_ADDONS_TABLE_ROWS = [
  ["highlight", "Emphasize important texts by marking it with a color."],
  ["emoji", "Add emojis to your content using an emoji picker."],
  ["code-block", "Provide syntax highlighting for code snippets."],
  ["block-quote", "Highlight a block of text as a quote."],
  ["attachments", "Add attachments to the editor."],
  ["video-upload", "Upload videos to the editor."],
  ["image-upload", "Upload images to the editor."],
  ["image-upload-unsplash", "Add unsplash integration to the image upload."],
  ["divider", "Add a horizontal line to separate different sections."],
  ["video-embed", "Embed videos from YouTube, Loom and Vimeo."],
  ["paste-unformatted", "Paste by removing all styles."],
  ["undo", "Undo last performed action."],
  ["redo", "Redo last performed action."],
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
  [
    "variables",
    "Accepts an array of objects which cotains value to be substituted for the variables.",
    `[{key: "name", value: "John"}]`,
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
  ["Emoji", "Ctrl + Shift + E", "Cmd + Shift + E"],
  ["Vieo uploader", "Ctrl + Shift + V", "Cmd + Shift + V"],
  ["Image uploader", "Ctrl + Shift + I", "Cmd + Shift + k"],
  ["Upload attachments", "Ctrl + Shift + A", "Cmd + Shift + A"],
];

export const CUSTOM_SLASH_COMMANDS_TABLE_COLUMNS = ["Property", "Description"];

export const CUSTOM_SLASH_COMMANDS_TABLE_ROWS = [
  [
    "title",
    "The name of the command that needs to be displayed. Accepts String values.",
  ],
  ["description", "The description for the command. Accepts String values."],
  [
    "optionName",
    "Unique key value for each command item. Accepts String values.",
  ],
  [
    "Icon",
    "The Icon that should be shown for command. Accepts a valid React component.",
  ],
  [
    "command",
    "A function which takes an object {editor, range} as it's argument. It may execute any commands using this editor instance.",
  ],
  [
    "items",
    "Accepts an array of items with all the above keys to create a nested command.",
  ],
];

export const WELCOME_PAGE_CARDS = [
  {
    heading: "Getting started",
    description: "Everything you need to get up and running.",
    link: {
      label: "Read more",
      url: "?path=/docs/getting-started--page",
    },
  },
  {
    heading: "Menu types",
    description: "All the information on different menu types",
    link: {
      label: "Read more",
      url: "?path=/docs/walkthroughs-menutypes-bubble-menu--bubble-menu",
    },
  },
  {
    heading: "Examples",
    description: "A walkthrough of different usages of the editor",
    link: {
      label: "Read more",
      url: "?path=/docs/examples-basic--basic",
    },
  },
];
