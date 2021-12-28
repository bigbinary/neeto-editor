import axios from "axios";

const getPhotos = () =>
  axios.get("https://api.unsplash.com/photos", {
    headers: {
      Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY}`,
    },
    params: {
      per_page: 30,
      order_by: "popular",
    },
  });

const searchPhotos = (query) =>
  axios.get("https://api.unsplash.com/search/photos", {
    headers: {
      Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY}`,
    },
    params: {
      per_page: 30,
      order_by: "popular",
      query: query,
    },
  });

const unsplashApi = {
  getPhotos,
  searchPhotos,
};

export default unsplashApi;
