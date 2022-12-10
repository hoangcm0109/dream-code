// import { axiosPrivate } from "../axiosClient";
import axios from "axios";
import { API_URL } from "../axiosClient";
class SubmitCodeService {
  async submitCode(data) {
    const response = await axios({
      method: 'post',
      url: `${API_URL}compiler/submit`,
      data: data,
      headers: {
          'Content-Type': `multipart/form-data`,
      },
  });
    return response.data;
  }
}

export default new SubmitCodeService();
