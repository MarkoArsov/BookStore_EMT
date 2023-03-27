import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:9091/api",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  },
});

export default instance;
