import axios from "axios";

const fetch = () => axios.get("https://cdn.jsdelivr.net/npm/@emoji-mart/data");

const emojiPickerApi = { fetch };

export default emojiPickerApi;
