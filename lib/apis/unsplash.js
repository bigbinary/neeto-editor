import axios from "axios";

const getPhotos = (query) =>
  axios.get("https://api.unsplash.com/photos", {
    headers: {
      Authorization: `Client-ID secret`,
    },
    params: {
      count: 30,
      order_by: "popular",
      query: query,
    },
  });

const unsplashApi = {
  getPhotos,
};

export default unsplashApi;
