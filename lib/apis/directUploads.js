import axios from "axios";

const generate = (url, payload, config) => axios.post(url, payload, config);

const create = (url, file, config) => axios.put(url, file, { ...config });

const directUploadsApi = { generate, create };

export default directUploadsApi;
