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
    "initialValue",
    "Accepts a valid HTML string. This string will be parsed to HTML and will be displayed as initial editor content",
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
    "Accepts an array of TipTap extensions. When provided, this will override the default extensions.",
    `[Bold, Color]`,
  ],
  [
    "className",
    "Accepts a string value. Can be used for further customisation of the editor content layout.",
    `"neeto-editor-content"`,
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
};
