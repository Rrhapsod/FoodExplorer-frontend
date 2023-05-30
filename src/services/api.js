import axios from "axios";

export const api = axios.create({
  baseURL: "https://foodexplorer-iovc.onrender.com",
});
