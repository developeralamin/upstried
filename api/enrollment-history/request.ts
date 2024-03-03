import { SERVER_ENROLLMENT_HISTORY } from '../../config/endpoints';
import { axioService, GET } from '../../services/axiosService';
import Api from '../API';
import { mapEnrollmentHistory } from './mapper';
import { getAuthToken } from '../../services/authentication';
class EnrollmentHistory extends Api {
  async getEnrollmentHistoy(tipsKeyId: string, username: string) {
    const token = getAuthToken();
    const response = await axioService(
      GET,
      SERVER_ENROLLMENT_HISTORY.replace(
        /:tips_id|:username/gi,
        function (s: string) {
          if (s === ':tips_id') return tipsKeyId;
          if (s === ':username') return username;
          else return '';
        }
      ),
      {},
      token
    );

    if (response.status === 200) {
      return {
        data: mapEnrollmentHistory(response.data.data),
      };
    }
  }
}

export default new EnrollmentHistory();
