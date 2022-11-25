export const EDITOR_COMMANDS_TABLE_COLUMNS = ["Command", "Description"];

export const EDITOR_COMMANDS_TABLE_ROWS = [
  ["clearContent()", "Clear the entire editor content."],
  ["insertContent(content)", "Insert content at the current cursor position."],
  ["insertContentAt(position, content)", "Insert content at the given index."],
  [
    "setContent(content)",
    "Replace the whole editor content with the given content.",
  ],
  ["focus()", "Focus the editor."],
  ["blur()", "Removes focus from the editor."],
];

export const EDITOR_METHODS_TABLE_COLUMNS = ["Method", "Description"];

export const EDITOR_METHODS_TABLE_ROWS = [
  ["getHTML()", "Returns the editor content as a valid HTML string."],
  ["getText()", "Returns the editor content as a plain text."],
  ["getJSON()", "Returns the editor content as a JSON object."],
  ["setEditable(bool)", "Controls whether the editor can be editable or not."],
  [
    "isEditable",
    "Returns a boolean value indicating whether the editor is editable or not.",
  ],
  [
    "isEmpty",
    "Returns a boolean value indicating whether the editor is empty or not.",
  ],
];

export const EDITOR_PROP_TABLE_ROWS = [
  [
    "ref",
    "Accepts a React reference. This reference can be used to access TipTap's inbuilt editor methods, such as getHTML().",
    `React.createRef()`,
  ],
  [
    "initialValue",
    "Accepts a valid HTML string. This string will be parsed to HTML and will be displayed as the editor content.",
    `"<p>Hello World</p"`,
  ],
  [
    "menuType",
    "Describes the menu type that editor should display. value should be one of ['fixed', 'bubble', 'none']. Defaults to 'fixed'.",
    `"bubble"`,
  ],
  [
    "autoFocus",
    "Accepts a boolean value. When true, the editor will be focused on load.",
    "true",
  ],
  [
    "hideSlashCommands",
    "Accepts a boolean value. When true, the Slash Commands menu will be hidden.",
    `true`,
  ],
  [
    "defaults",
    "Accepts an array of strings, each corresponding to the name of a default option.",
    `["h1", "h2", "h3", "h4", "h5", "h6"]`,
  ],
  [
    "addons",
    "Accepts an array of strings, each corresponding to the name of an addon.",
    `["highlight", "emoji", "code-block", "block-quote", "image-upload", "divider", "video-embed", "paste-unformatted"]`,
  ],
  [
    "addonCommands",
    "Accepts an array of additional custom Slash Command items to be displayed along with pre-defined command items.",
    `[{ title: 'Focus Editor', description: 'Focus the editor', optionName: 'focus-editor', command: ({editor}) => editor.focus() }]`,
  ],
  [
    "className",
    "Accepts a string value. Can be used for further customisation of the editor content layout.",
    `"neeto-editor-content"`,
  ],
  [
    "uploadEndpoint",
    "Accepts an URL endpoint string. This URL will be used for XHR image uploads.",
    `"/api/direct_uploads"`,
  ],
  [
    "uploadConfig",
    "Accepts an object. This object will be used to configure the image uploader.",
    `{
      autoProceed: true,
      allowMultipleUploads: false,
      restrictions: {
        maxFileSize: 1048576,
        allowedFileTypes: [".jpg"]
      },
    }`,
  ],
  [
    "onChange",
    "Accepts a function. This function will be invoked whenever the editor content changes, with new the content as argument.",
    `(newContent) => {}`,
  ],
  [
    "onFocus",
    "Accepts a function. This function will be invoked whenever the editor is focused.",
    `() => {}`,
  ],
  [
    "onBlur",
    "Accepts a function. This function will be invoked whenever the editor has lost focus.",
    `() => {}`,
  ],
  [
    "onSubmit",
    "Accepts a function. This function will be invoked when the editor is submitted.",
    "(htmlContent) => {}",
  ],
  [
    "variables",
    "Accepts an array of variable suggestions.",
    `[{ label: "Subdomain", key: "subdomain" }]`,
  ],
  [
    "mentions",
    "Accepts an array of mention suggestions.",
    `[{ name: "Oliver Smith", key: "oliver-smith", imageUrl: "url" }]`,
  ],
  [
    "placeholder",
    "Accepts a string value. When provided, it displays the placeholder value in the editor.",
    `"Input text here"`,
  ],
  [
    "extensions",
    "Accepts an array of TipTap extensions. When provided, this will be combined with the default set of extensions.",
    `[Bold, Color]`,
  ],
  [
    "editorSecrets",
    "Accepts an object. Use this prop to pass down API keys and other secrets.",
    `{
      unsplash: "<unsplash-api-key>"
     }`,
  ],
  [
    "rows",
    "Accepts an integer value. When provided, the editor height will be limited to a certain number of rows.",
    "6",
  ],
  [
    "isCharacterCountActive",
    "Accepts a boolean value. If provided, the character count will be displayed.",
    "true",
  ],
  [
    "keyboardShortcuts",
    "Accepts an object representing the custom keyboard shortcuts for the editor in addition to the existing shortcuts.",
    `{
        Enter: ({ editor }) => {
           console.log(editor.getHTML());
           return true;
        },
        "Shift-Enter": ({ editor }) => {
          console.log(editor.getHTML());
          return true;
        }
      }
    `,
  ],
  [
    "error",
    "Accepts a string value. If provided, it will render the error UI for the editor.",
    "This field is required",
  ],
  [
    "config",
    "Accepts an object value. This can be used to overrride the default properties of the different extensions used with the editor.",
    `
    {
      focus: { mode: "deepest" }
    }
    `,
  ],
];

export const ARG_VALUES = EDITOR_PROP_TABLE_ROWS.reduce((acc, value) => {
  return {
    ...acc,
    [value[0]]: {
      name: value[0],
      description: value[1],
      control: false,
      table: {
        defaultValue: { summary: value[2] },
      },
    },
  };
}, {});
