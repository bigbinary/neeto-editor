import axiosEditorInstance from "./axios";

const fetch = () =>
  axiosEditorInstance.get("https://cdn.jsdelivr.net/npm/@emoji-mart/data");

const emojiPickerApi = { fetch };

export default emojiPickerApi;
