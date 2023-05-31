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

const update = ({ url, signedId, payload, showToastr = true }) =>
  axios.patch(`${url}/${signedId}/`, payload, {
    transformRequestCase: false,
    transformResponseCase: false,
    showToastr,
  });

const destroy = (url, signedId, showToastr = true) =>
  axios.delete(`${url}/${signedId}`, {
    showToastr,
  });

const attach = (url, payload, showToastr = true) =>
  axios.post(`${url}/attach`, payload, { showToastr });

const directUploadsApi = { generate, create, update, destroy, attach };

export default directUploadsApi;
