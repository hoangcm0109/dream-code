import { axiosPrivate } from "../axiosClient";

class ProblemService {
  async getAllProblem() {
    const response = await axiosPrivate.get(`/problem`);
    return response.data;
  }
  async getProblemById(id) {
    const response = await axiosPrivate.get(`/problem/` + id);
    return response.data;
  }
  async createProblem(data) {
    const response = await axiosPrivate.post(`/problem`, data);
    return response.data;
  }
  async changeProblem(id, data) {
    const response = await axiosPrivate.post(`/problem/` + id, data);
    return response.data;
  }
  async deleteProblem(id) {
    const response = await axiosPrivate.delete(`/problem/` + id);
    return response.data;
  }
}

export default new ProblemService();
