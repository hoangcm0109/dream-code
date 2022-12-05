import { axiosPrivate } from "../axiosClient";

class UserService {
  async getAllUser() {
    const response = await axiosPrivate.get(`/users`);
    return response.data;
  }

  async getUserById(id) {
    const response = await axiosPrivate.get(`/users/` + id);
    return response.data;
  }

  async createUser(data) {
    const response = await axiosPrivate.post(`/users`, data);
    return response.data;
  }

  async changeUser(id, data) {
    const response = await axiosPrivate.patch(`/users/` + id, data);
    return response.data;
  }

  async deleteUser(id) {
    const response = await axiosPrivate.delete(`/users/` + id);
    return response.data;
  }
}

export default new UserService();
