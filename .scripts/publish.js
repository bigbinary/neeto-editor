const Uploader = require("@bigbinary/s3-uploader");
const dotEnv = require("dotenv");

dotEnv.config({ path: ".env" });

const getS3UploaderConfig = () => ({
  bucket: "neeto-editor-production",
  distribution: "E3IFTI8KVD6OKE",
  fileProperties: {
    "*": { CacheControl: "no-cache" },
  },
});

const uploadFiles = async () => {
  const uploaderConfig = getS3UploaderConfig();
  const uploader = new Uploader(uploaderConfig);

  uploader.addFile("dist/editor-content.min.css");
  uploader.addFile("dist/editor-output-pdf-email.css");
  uploader.addFile("dist/codeblockHighlight.js");
  uploader.addFile("dist/headerLinks.js");
  uploader.addFile("dist/editorUtils.js");

  try {
    console.log("Starting upload...");
    await uploader.upload();
    console.log("Upload completed successfully.");
  } catch (error) {
    console.error("Upload failed:", error);
  }
};

uploadFiles();
