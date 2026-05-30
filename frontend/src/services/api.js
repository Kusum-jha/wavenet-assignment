import axios from "axios";

const API = axios.create({
  baseURL: "https://wavenet-assignment-iov9.onrender.com/api"
});

export default API;
