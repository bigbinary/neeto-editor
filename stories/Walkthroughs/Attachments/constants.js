import { noop } from "neetocist";

export const ATTACHMENTS_TABLE_COLUMNS = ["Prop", "Description"];

export const ATTACHMENTS_TABLE_ROWS = [
  ["attachments", "An array of the metadata of all the attachments."],
  [
    "onChange",
    "Callback function to be called when the attachments need to be updated as a result of CRUD operations.",
  ],
  ["endpoint", "Endpoint to upload attachments to."],
  [
    "isIndependent",
    "The default 'Add attachments' button can be hidden by providing a falsy value.",
  ],
  ["dragDropRef", "Ref to the drag and drop wrapper component."],
  [
    "ref",
    "Ref for the Attachments component. This ref needs to be used for accessing the handleUploadAttachment function.",
  ],
  [
    "disabled",
    "If true, the options to download, rename and delete the attachments will be disabled.",
  ],
  [
    "config",
    "Object to customize Attachments component, It has 3 properties: allowedFileTypes, maxNumberOfFiles and maxFileSize.",
  ],
  [
    "showToastr",
    "Boolean to show/hide toastr when an attachment is deleted/renamed, default value is true.",
  ],
];

//TODO: Undo the changes
export const attachments = [
  {
    filename: "Dummy_file_generated_on_2022-01-01.pdf",
    url: "https://icseindia.org/document/sample.pdf",
    signedId: "1",
    contentType: "application/pdf",
    size: 13264,
  },
  {
    filename: "Dummy_doc1-01.docx",
    url: "https://calibre-ebook.com/downloads/demos/demo.docx",
    signedId: "3",
    contentType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    size: 100264,
  },
  {
    filename: "Dummy xl sheet",
    url: "https://sample-videos.com/xls/Sample-Spreadsheet-10-rows.xls",
    signedId: "4",
    contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    size: 13264,
  },
  {
    filename: "Dummy Image.jpg",
    url: "https://dummyimage.com/600x400/8f898f/0011ff&text=This+is+a+dummy+image",
    signedId: "2",
    contentType: "image/jpeg",
    size: 1951,
  },
  {
    filename: "Dummy_unsupported file.unsupported",
    url: "https://example.com/dummy-database-dump.sql",
    signedId: "5",
    contentType: "application/unsupported",
    size: 5242880,
  },
];

export const setAttachments = noop;
