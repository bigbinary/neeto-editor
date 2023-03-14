import axiosEditorInstance from "./axios";

const generate = (url, payload, config) =>
  axiosEditorInstance.post(url, payload, {
    ...config,
  });

const create = (url, file, config) =>
  axiosEditorInstance.put(url, file, {
    ...config,
  });

const update = ({ url, signedId, payload }) =>
  axiosEditorInstance.patch(`${url}/${signedId}/`, payload);

const destroy = (url, signedId) =>
  axiosEditorInstance.delete(`${url}/${signedId}`);

const directUploadsApi = { generate, create, update, destroy };

export default directUploadsApi;
