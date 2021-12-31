import axios from "axios";

import { UNSPLASH_BASE_URL } from "constants/common";

export const searchUnsplashImages = (pageNo, query) =>
  axios.get(UNSPLASH_BASE_URL, {
    headers: {
      Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY}`,
    },
    params: {
      page: pageNo,
      per_page: 30,
      order_by: "popular",
      query: query,
    },
  });
