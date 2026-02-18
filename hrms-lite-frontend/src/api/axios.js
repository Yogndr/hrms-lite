import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000", // change to live URL later
});

export default API;
