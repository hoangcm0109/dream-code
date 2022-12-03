import { axiosPrivate } from "../axiosClient";

class TestCaseService {
  async getAllTestCase() {
    const response = await axiosPrivate.get(`/testcase`);
    return response.data;
  }
}

export default new TestCaseService();
