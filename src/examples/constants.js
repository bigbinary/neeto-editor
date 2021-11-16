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
    imageUrl: "https://via.placeholder.com/150/0000FF/808080",
  },
  "Jaden Smith",
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
      imageUrl: "https://via.placeholder.com/150/0000FF/808080"
    },
    "Jaden Smith",
  ]

  <Editor mentions={mentions} showImageInMention />`,

  placeholderSampleCode: `
  <Editor placeholder="Input text here" />`,

  forceTitleSampleCode: `
  const placeholder = { heading: 'Input title here' };
 
  <Editor placeholder={placeholder} forceTitle />`,
};
