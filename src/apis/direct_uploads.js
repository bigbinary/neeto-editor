import axios from "axios";

const axiosWithoutShowErrorInterceptor = axios.create();

// remove the showErrorToaster interceptor from the interceptors list
axiosWithoutShowErrorInterceptor.interceptors.request.use(config => {
  const interceptors = axiosWithoutShowErrorInterceptor.interceptors;
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
  axiosWithoutShowErrorInterceptor.put(url, file, {
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
