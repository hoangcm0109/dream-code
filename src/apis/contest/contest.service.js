import { axiosPrivate } from "../axiosClient";

class ContestService {
  async getAllContest() {
    const response = await axiosPrivate.get(`/contest`);
    return response.data;
  }

  async endContest(data) {
    const response = await axiosPrivate.post(`/contest/end`, data);
    return response.data;
  }

}

export default new ContestService();
