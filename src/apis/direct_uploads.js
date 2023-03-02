// eslint-disable-next-line @bigbinary/neeto/no-axios-import-outside-apis
import axios from "axios";

const generate = (url, payload, config) =>
  axios.post(url, payload, {
    ...config,
    transformRequestCase: false,
    transformResponseCase: false,
  });

const create = (url, file, config) =>
  axios.put(url, file, {
    ...config,
    transformRequestCase: false,
    transformResponseCase: false,
    showToastr: false,
  });

const update = ({ url, signedId, payload }) =>
  axios.patch(`${url}/${signedId}/`, payload, {
    transformRequestCase: false,
    transformResponseCase: false,
  });

const destroy = (url, signedId) => axios.delete(`${url}/${signedId}`);

const directUploadsApi = { generate, create, update, destroy };

export default directUploadsApi;
