import axios from "axios";

const axiosInstanceWithoutShowErrorInterceptor = axios.create();

axiosInstanceWithoutShowErrorInterceptor.interceptors.request.use(config => {
  const interceptors = axiosInstanceWithoutShowErrorInterceptor.interceptors;
  const showErrorInterceptor = interceptors.request.handlers.find(
    interceptor => interceptor.fulfilled.name === "showErrorToaster"
  );
  interceptors.request.eject(showErrorInterceptor);

  return config;
});

const generate = (url, payload, config) =>
  axios.post(url, payload, {
    ...config,
    transformRequestCase: false,
    transformResponseCase: false,
    showToastr: false,
  });

const create = (url, file, config) =>
  axiosInstanceWithoutShowErrorInterceptor.put(url, file, {
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
