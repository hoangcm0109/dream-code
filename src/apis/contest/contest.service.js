import { axiosPrivate } from "../axiosClient";

class ContestService {
  async getAllContest() {
    const response = await axiosPrivate.get(`/contest`);
    return response.data;
  }

  async getContestById(id) {
    const response = await axiosPrivate.get(`/contest/` + id);
    return response.data;
  }

  async createContest(data) {
    const response = await axiosPrivate.post(`/contest`, data);
    return response.data;
  }

  async changeContest(id, data) {
    const response = await axiosPrivate.patch(`/contest/` + id, data);
    return response.data;
  }

  async deleteContest(id) {
    const response = await axiosPrivate.delete(`/contest/` + id);
    return response.data;
  }

  async endContest(data) {
    const response = await axiosPrivate.post(`/contest/end`, data);
    return response.data;
  }

}

export default new ContestService();
