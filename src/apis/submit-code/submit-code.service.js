import { axiosPrivate } from "../axiosClient";

class SubmitCodeService {
  async submitCode(data) {
    const response = await axiosPrivate.post(`/compiler/submit`, data);
    return response.data;
  }
}

export default new SubmitCodeService();
