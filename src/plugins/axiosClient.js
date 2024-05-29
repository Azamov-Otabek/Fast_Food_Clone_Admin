import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://app.rarebek.uz/v1",
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `${token}`;
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export default axiosClient;
