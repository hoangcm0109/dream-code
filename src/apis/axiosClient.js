import axios from "axios";
export const API_URL = "http://52.140.222.193:8080/api/v1/";
// export const API_URL = "http://192.168.136.105:8888/api/v1/";
export const axiosPrivate = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});
