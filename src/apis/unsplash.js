// eslint-disable-next-line @bigbinary/neeto/no-axios-import-outside-apis
import axios from "axios";

import { UNSPLASH_BASE_URL } from "common/constants";

export const searchUnsplashImages = ({ pageNo, query, apiKey }) =>
  axios.get(UNSPLASH_BASE_URL, {
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
