import { UNSPLASH_BASE_URL } from "common/constants";

import axiosEditorInstance from "./axios";

export const searchUnsplashImages = ({ pageNo, query, apiKey }) =>
  axiosEditorInstance.get(UNSPLASH_BASE_URL, {
    headers: {
      Authorization: `Client-ID ${apiKey}`,
    },
    params: {
      page: pageNo,
      per_page: 30,
      order_by: "popular",
      query,
    },
  });
