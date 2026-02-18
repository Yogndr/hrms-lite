import axios from "axios";

const API = axios.create({
  baseURL: "https://hrms-lite-q3re.onrender.com", // change to live URL later
});

export default API;
