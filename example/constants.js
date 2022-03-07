export const EDITOR_FEATURES = [
  "Multiple Menu options such as Fixed, Bubble",
  "Support for inline styles: Bold, Italic, Underline, StrikeThrough",
  "Support for diffent font sizes, Blockquote and Code",
  "Support for font color option",
  "Support for adding Links and Images",
  "Ordered and Unordered List Support",
  "Undo and Redo available",
  "Inbuilt variable support",
];

export const SAMPLE_VARIABLES = [
  {
    category_key: "ticket",
    category_label: "Ticket",
    variables: [
      { label: "ID", key: "id" },
      { label: "Number", key: "number" },
      { label: "Subject", key: "subject" },
      { label: "Description", key: "description" },
      { label: "Source/Channel", key: "source" },
      { label: "Category", key: "category" },
      { label: "Priority", key: "priority" },
      { label: "Status", key: "status" },
      { label: "Customer URL/Link", key: "customer_url" },
      { label: "Latest Comment", key: "latest_comment" },
      { label: "Created at", key: "created_at" },
      { label: "Updated at", key: "updatedt_at" },
    ],
  },
  { label: "Subdomain", key: "subdomain" },
  {
    category_key: "organisation",
    category_label: "Organisation",
    variables: [
      { label: "ID", key: "id" },
      { label: "Name", key: "name" },
      { label: "Slug", key: "slug" },
    ],
  },
];

export const SAMPLE_MENTIONS = [
  {
    label: "Oliver Smith",
    key: "oliver-smith",
    imageUrl: "https://i.pravatar.cc/300",
  },
  "Jaden Smith",
];

export const EDITOR_PROP_TABLE_COLUMNS = [
  "Prop",
  "Description",
  "Sample Value",
];

export const EDITOR_PROP_TABLE_ROWS = [
  [
    "ref",
    "Accepts a React reference. This reference can be used to access TipTap's inbuilt editor methods, such as getHTML()",
    `React.createRef()`,
  ],
  [
    "value",
    "Accepts a valid HTML string. This string will be parsed to HTML and will be displayed as the editor content",
    `"<p>Hello World</p"`,
  ],
  [
    "onChange",
    "Accepts a function. This function will be invoked whenever editor content changes, with new content as argument",
    `(newContent) => {}`,
  ],
  [
    "menuType",
    "Describes the menu type that editor should display. value should be one of ['fixed', 'bubble']. defaults to 'fixed'",
    `"bubble"`,
  ],
  [
    "hideSlashCommands",
    "Accepts a boolean value. When true, the Slash Commands menu will be hidden",
    `true`,
  ],
  [
    "placeholder",
    "Accepts a string, an object or a function that returns the placeholder for HTML nodes.",
    `"Input text here"`,
  ],
  [
    "forceTitle",
    "Accepts a boolean value. When true, the content is forced to have a title by default.",
    `true`,
  ],
  [
    "titleError",
    "Accepts a boolean value. When true, an error message will be displayed below the title field when it is empty",
    `true`,
  ],
  [
    "uploadEndpoint",
    "Accepts an URL endpoint string. This URL will be used for XHR image uploads",
    `"/api/v1/direct_uploads"`,
  ],
  [
    "variables",
    "Accepts an array of variable suggestions.",
    `[{ label: "Subdomain", key: "subdomain" }]`,
  ],
  [
    "mentions",
    "Accepts an array of mention suggestions.",
    `[{ label: "Oliver Smith", key: "oliver-smith" }]`,
  ],
  [
    "showImageInMention",
    "Accepts a boolean value. This value controls the visibility of images in mention suggestions",
    `true`,
  ],
  [
    "formatterOptions",
    "Accepts an array of string values. The values are used to filter actions that should be shown in the Bubble menu.",
    `["bold", "italic", "code", "highlight", "strike", "link"]`,
  ],
  [
    "extensions",
    "Accepts an array of TipTap extensions. When provided, this will be combined with the default set of extensions.",
    `[Bold, Color]`,
  ],
  [
    "className",
    "Accepts a string value. Can be used for further customisation of the editor content layout.",
    `"neeto-editor-content"`,
  ],
  [
    "addons",
    "Accepts an array of strings, each corresponding to the name of an addon.",
    `["highlight", "emoji", "code-block", "block-quote", "image-upload", "divider", "video-embed"]`,
  ],
  [
    "addonCommands",
    "Accepts an array of additional custom Slash Command items to be displayed along with pre-defined command items",
    `[{ title: 'Focus Editor', description: 'Focus the editor', optionName: 'focus-editor', command: ({editor}) => editor.focus() }]`,
  ],
  [
    "markdownMode",
    "Accepts a boolean value. When true, the editor will be rendered in markdown mode.",
    "true",
  ],
  [
    "characterLimit",
    "Accepts an integer value. When provided, the editor will be limited to a certain number of characters.",
    "1000",
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
    "heightStrategy",
    "Accepts a string value. This decides whether the editor height is fixed or flexible.",
    "fixed",
  ],
  [
    "autoFocus",
    "Accepts a boolean value. When true, the editor will be focused on load.",
    "true",
  ],
  [
    "onSubmit",
    "Accepts a function. This function will be invoked when the editor is submitted.",
    "(htmlContent) => {}",
  ],
  [
    "characterCountStrategy",
    "Accepts a string value. This decides on how the character count should be displayed.",
    "limit",
  ],
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

export const SAMPLE_ADDONS = [
  "highlight",
  "emoji",
  "code-block",
  "block-quote",
  "image-upload",
  "divider",
  "video-embed",
];

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

export const STRINGS = {
  fixedMenuSampleCode: `
  <Editor />`,

  bubbleMenuSampleCode: `
  <Editor menuType='bubble'/>`,

  hideSlashCommandSampleCode: `
  <Editor hideSlashCommands />`,

  variableSampleCode: `
  const variables = [
    {
      category_key: "ticket",
      category_label: "Ticket",
      variables: [
        { label: "ID", key: "id" },
        { label: "Number", key: "number" },
      ],
    },
    { label: "Subdomain", key: "subdomain" },
    {
      category_key: "organisation",
      category_label: "Organisation",
      variables: [
        { label: "ID", key: "id" },
        { label: "Name", key: "name" },
        { label: "Slug", key: "slug" },
      ],
    },
  ]

  <Editor variables={variables} />`,

  mentionsSampleCode: `
  const mentions = [
    {
      label: "Oliver Smith",
      key: "oliver-smith",
      imageUrl: "https://i.pravatar.cc/300"
    },
    "Jaden Smith",
  ]

  <Editor mentions={mentions} showImageInMention />`,

  placeholderSampleCode: `
  <Editor placeholder="Input text here" />`,

  forceTitleSampleCode: `
  const placeholder = { title: 'Input title here', paragraph: 'Enter your content' };

  <Editor placeholder={placeholder} forceTitle />`,

  addonsSampleCode: `
  const addons = [
    "highlight",
    "emoji",
    "code-block",
    "block-quote",
    "image-upload",
    "divider",
    "video-embed",
  ];

  <Editor addons={addons} />`,

  unsplashSampleCode: `
  const editorSecrets = {
    unsplash: "<unsplash-api-key>"
  };

  <Editor
    addons={["image-upload-unsplash"]}
    editorSecrets={editorSecrets}
  />`,

  markdownModeSampleCode: `
  const [isMarkdownModeActive, setIsMarkdownModeActive] = useState(false);

  <Editor
    menuType="bubble"
    markdownMode={isMarkdownModeActive}
  />
  `,

  characterCountSampleCode: `
  <Editor characterCountStrategy="count" />
  `,

  characterLimitSampleCode: `
  <Editor
    characterCountStrategy="limit"
    characterLimit={100}
  />
  `,

  editorHeightSampleCode: `
  <Editor rows={3} heightStrategy="flexible" />
  `,

  editorOnSubmitSampleCode: `
    const handleSubmit = (htmlContent) => {
      console.log(htmlContent);
    }

    <Editor onSubmit={handleSubmit} />
  `,
};
