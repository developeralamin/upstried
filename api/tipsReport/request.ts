import {
  SERVER_ENROLLMENT_TIPS_REPORT_ENDPOINT,
  SERVER_ENROLLMENT_TASK_LOGS_ENDPOINT,
  SERVER_ENROLLMENT_TASK_FETCH_TOKEN,
  SERVER_ENROLLMENT_TASK_DISABLE_LINK,
} from '../../config/endpoints';
import { axioService, GET, POST } from '../../services/axiosService';
import Api from '../API';
import { mapEnrollmentReport, mapTaskLogs } from './mapper';
import { getAuthToken } from '../../services/authentication';
class EnrollmentTipsReportAPI extends Api {
  async getEnrollmentTipsReport(enrollmentId: string, sharetoken: string) {
    const token = getAuthToken();
    const response = await axioService(
      GET,
      SERVER_ENROLLMENT_TIPS_REPORT_ENDPOINT.replace(
        ':enrollment_id',
        enrollmentId
      ),
      { token: sharetoken },
      token
    );
    if (response.status === 200) {
      // console.log(response.data.data);
      return {
        data: mapEnrollmentReport(response.data.data),
      };
    }
  }

  async getTaskLogs(enrollmentId: string, taskId: string, page: number) {
    const token = getAuthToken();
    const response = await axioService(
      GET,
      SERVER_ENROLLMENT_TASK_LOGS_ENDPOINT.replace(
        /:enrollment_id|:task_id/gi,
        function (s: string) {
          if (s === ':enrollment_id') return enrollmentId;
          if (s === ':task_id') return taskId;
          else return '';
        }
      ),
      { page },
      token
    );
    if (response.status === 200) {
      return {
        data: mapTaskLogs(response.data),
      };
    }
    return false;
  }
  async generateAccessToken(enrollmentId: string) {
    const token = getAuthToken();
    const response = await axioService(
      POST,
      SERVER_ENROLLMENT_TASK_FETCH_TOKEN.replace(
        ':enrollment_id',
        enrollmentId
      ),
      {},
      token
    );
    if (response.status === 200) {
      console.log(response.data);
      return {
        data: response.data,
      };
    }
    return false;
  }
  async disableAccessLink(enrollmentId: string) {
    const token = getAuthToken();
    const response = await axioService(
      POST,
      SERVER_ENROLLMENT_TASK_DISABLE_LINK.replace(
        ':enrollment_id',
        enrollmentId
      ),
      {},
      token
    );
    if (response.status === 204) {
      // console.log(response.data);
      return true;
    }
    return false;
  }
}

export default new EnrollmentTipsReportAPI();
// tips/enrollments/:enrollment_id/tasks/:task_id/logs
