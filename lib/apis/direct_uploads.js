import axios from "axios";

const generate = (url, payload, config) => axios.post(url, payload, config);

const create = (url, file, config) => axios.put(url, file, { ...config });

const destroy = url => axios.delete(url);

const directUploadsApi = { generate, create, destroy };

export default directUploadsApi;
