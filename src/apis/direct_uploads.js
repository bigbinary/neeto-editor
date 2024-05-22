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

const update = ({ signedId, payload }) =>
  axios.patch(`/api/direct_uploads/${signedId}/`, payload, {
    transformRequestCase: false,
    transformResponseCase: false,
    showToastr: false,
  });

const destroy = signedId =>
  axios.delete(`/api/direct_uploads/${signedId}`, { showToastr: false });

const attach = payload =>
  axios.post("/neeto_editor/api/v1/direct_uploads/attach", payload, {
    showToastr: false,
  });

const directUploadsApi = { generate, create, update, destroy, attach };

export default directUploadsApi;
