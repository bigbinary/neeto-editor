// eslint-disable-next-line @bigbinary/neeto/no-axios-import-outside-apis
import axios from "axios";

const fetch = () => axios.get("https://cdn.jsdelivr.net/npm/@emoji-mart/data");

const emojiPickerApi = { fetch };

export default emojiPickerApi;
