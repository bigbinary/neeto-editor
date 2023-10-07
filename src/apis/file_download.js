import axios from "axios";

const newAxiosInstance = axios.create();

const getFile = url => newAxiosInstance.get(url, { responseType: "blob" });

const fileDownloadApi = { getFile };

export default fileDownloadApi;
