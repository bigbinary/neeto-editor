import { noop } from "neetocommons/pure";

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

export const attachments = [
  {
    filename: "Books.pdf",
    url: "https://i.picsum.photos/id/24/4855/1803.jpg?hmac=ICVhP1pUXDLXaTkgwDJinSUS59UWalMxf4SOIWb9Ui4",
    signedId: "1",
  },
  {
    filename: "Headphones.jpg",
    url: "https://i.picsum.photos/id/26/4209/2769.jpg?hmac=vcInmowFvPCyKGtV7Vfh7zWcA_Z0kStrPDW3ppP0iGI",
    signedId: "2",
  },
];

export const setAttachments = noop;
