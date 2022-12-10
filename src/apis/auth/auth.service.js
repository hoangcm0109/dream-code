import axios from "axios";

const API_URL = "http://52.140.222.193:8080/api/v0/auth";
const axiosAuth = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

class AuthService {
  async login(data) {
    const response = await axiosAuth.post(`/login`, data);
    return response.data;
  }
  async signUp(data) {
    const response = await axiosAuth.post(`/signup`, data);
    return response.data;
  }
}

export default new AuthService();
