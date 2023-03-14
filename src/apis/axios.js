import axios from "axios";

const axiosEditorInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default axiosEditorInstance;
