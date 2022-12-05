import { axiosPrivate } from "../axiosClient";

class TestCaseService {
  async getAllTestCase() {
    const response = await axiosPrivate.get(`/testcase`);
    return response.data;
  }

  async getTestCaseById(id) {
    const response = await axiosPrivate.get(`/testcase/` + id);
    return response.data;
  }

  async createTestCase(idProblem, data) {
    const response = await axiosPrivate.post(`/testcase/` + idProblem, data);
    return response.data;
  }

  async changeTestCase(id, data) {
    const response = await axiosPrivate.patch(`/testcase/` + id, data);
    return response.data;
  }

  async deleteTestCase(id) {
    const response = await axiosPrivate.delete(`/testcase/` + id);
    return response.data;
  }
}

export default new TestCaseService();
