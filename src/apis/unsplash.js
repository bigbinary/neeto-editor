import axios from "axios";

import { UNSPLASH_BASE_URL } from "common/constants";

export const searchUnsplashImages = ({ pageNo, query, apiKey }) =>
  axios.get(UNSPLASH_BASE_URL, {
    headers: { Authorization: `Client-ID ${apiKey}` },
    params: { page: pageNo, per_page: 30, query },
  });
