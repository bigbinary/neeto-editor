import axios from "axios";

const axiosEditorInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosEditorInstance.interceptors.response.use(
  response => pullDataFromResponse(response),
  error => Promise.reject(error)
);

const pullDataFromResponse = response => {
  const { includeMetadataInResponse = false } = response.config;

  return includeMetadataInResponse ? response : response.data;
};

export default axiosEditorInstance;
