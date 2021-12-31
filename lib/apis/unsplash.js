import axios from "axios";

export const searchUnsplashImages = (pageNo, query) =>
  axios.get("https://api.unsplash.com/search/photos", {
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
