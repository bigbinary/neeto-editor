import axios from "axios";

const getPhotos = () =>
  axios.get("https://api.unsplash.com/photos", {
    headers: {
      Authorization: `Client-ID secret`,
    },
  });

const unsplashApi = {
  getPhotos,
};

export default unsplashApi;
