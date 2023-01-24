import axios from "axios";

const generate = (url, payload, config) => axios.post(url, payload, config);

const create = (url, file, config) =>
  axios.put(url, file, {
    ...config,
    transformRequestCase: false,
    showToastr: false,
  });

const update = (url, signedId, payload) =>
  axios.patch(`${url}/${signedId}/`, payload);

const destroy = (url, signedId) => axios.delete(`${url}/${signedId}`);

const directUploadsApi = { generate, create, update, destroy };

export default directUploadsApi;
