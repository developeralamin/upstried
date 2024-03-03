import {
  SERVER_TASK_DASHBOARD_ENDPOINT,
  SERVER_TASK_DASHBOARD_MARK_ALL_DONE_TASKS_ENDPOINT,
} from '../../config/endpoints';
import Api from '../API';
import { axioService, GET, POST } from '../../services/axiosService';
import { TaskObj } from '../tasks/dataTypes';
import {
  ServerTaskObjTaskDashboard,
  TipsTaskDashboard,
  ServerEnrollmentTaskDashboard,
  TaskDashboardObj,
  ResponseAll,
} from './dataTypes';

import { mapTaskFromServer } from '../tasks/mapper';
import { mapTaskMeta, mapTipsTaskDashboard } from './mapper';
import { getAuthToken, getAuthUsername } from '../../services/authentication';

class TaskDashboardAPI extends Api {
  all = async (from: string, to: string): Promise<ResponseAll | boolean> => {
    const params: any = {};

    params['start_date'] = to;
    params['end_date'] = from;
    const token = getAuthToken();
    const username = getAuthUsername();
    const response = await axioService(
      GET,
      SERVER_TASK_DASHBOARD_ENDPOINT.replace(':username', username),
      params,
      token
    );

    if (response.status === 200) {
      return {
        data: response.data.data.map(
          (enrollment: ServerEnrollmentTaskDashboard): TipsTaskDashboard => {
            const tasks: TaskDashboardObj[] = enrollment.tasks.map(
              (task: ServerTaskObjTaskDashboard) => {
                const mappedTask: TaskObj = mapTaskFromServer(task);
                (mappedTask as TaskDashboardObj).meta = mapTaskMeta(task.meta);
                return mappedTask as TaskDashboardObj;
              }
            );

            return mapTipsTaskDashboard(tasks, enrollment, to);
          }
        ),
      };
    }
    return false;
  };
  markAllDone = async (enrollmentId: string, tasks: any) => {
    const token = getAuthToken();

    await axioService(
      POST,
      SERVER_TASK_DASHBOARD_MARK_ALL_DONE_TASKS_ENDPOINT.replace(
        'enrollment_id',
        enrollmentId
      ),
      tasks,
      token
    );
  };
}

export default new TaskDashboardAPI();
