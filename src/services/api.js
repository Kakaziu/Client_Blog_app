import axios from "axios";

const api = axios.create({
  baseURL: "https://server-blog-app-rho.vercel.app/",
});

export default api;
