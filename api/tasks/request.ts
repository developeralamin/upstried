import moment from 'moment';
import { getAuthToken } from '../../services/authentication';
import {
  SERVER_TIPS_ENROLLMENT_TASKS_ENDPOINT,
  SERVER_TIPS_TASKS_ENDPOINT,
} from '../../config/endpoints';
import { axioService, GET, POST } from '../../services/axiosService';
import { ServerTasksObj, TaskObj } from './dataTypes';
import { mapTaskFromServer } from './mapper';

export class TaskAPI {
  getByTipId = async (id: string): Promise<[TaskObj[], number, number]> => {
    const response = await axioService(
      GET,
      SERVER_TIPS_TASKS_ENDPOINT.replace(':slug', id),
      {},
      getAuthToken()
    );
    return [
      (response?.data as ServerTasksObj)?.data?.map((iter) =>
        mapTaskFromServer(iter)
      ) || [],
      (response?.data as ServerTasksObj)?.meta.total,
      (response?.data as ServerTasksObj)?.meta.completed,
    ];
  };

  getCompletionCount = (meta: any) => meta.done + meta.failed + meta.skipped;

  getTasksByTipId = async (id: string) => {
    //deprecated
    const response = await axioService(
      GET,
      SERVER_TIPS_TASKS_ENDPOINT.replace(':slug', id),
      {},
      getAuthToken()
    );
    if (response.status === 200) {
      return {
        data:
          (response?.data as ServerTasksObj)?.data?.map((iter) =>
            mapTaskFromServer(iter)
          ) || [],
        total: response.data.meta.total || 1,
        totalCompletedTask: this.getCompletionCount(response.data.meta),
        completed: response.data.meta.completed || 0,
        done: response.data.meta.done || 0,
        failed: response.data.meta.failed || 0,
        skipped: response.data.meta.skipped || 0,
      };
    }
    return false;
  };
  getTasksByEnrollmentId = async (enrollmentId: string) => {
    // const [token] = getSessionInfo();
    // console.log('en id', enrollmentId);
    const response = await axioService(
      GET,
      SERVER_TIPS_ENROLLMENT_TASKS_ENDPOINT.replace(
        ':enrollment_id',
        enrollmentId
      ),
      {},
      getAuthToken()
    );
    if (response.status === 200) {
      // console.log('tasks 2', response.data.data.tips);
      return {
        data:
          response?.data?.data.tasks.map((task: any) => {
            return mapTaskFromServer(task);
          }) || [],
        total: response.data.data.total || 1,
        totalCompletedTask: response.data.data.completed || 0,
        completed: response.data.data.completed || 0,
        done: response.data.data.done || 0,
        failed: response.data.data.failed || 0,
        skipped: response.data.data.skipped || 0,
        tips: response.data.data.tips,
      };
    }
    return false;
  };

  markComplete = async (
    tipId: string,
    id: string,
    completedAt: moment.Moment | null,
    timelineStatus: 0 | 1 | 2 | 3
  ): Promise<void> => {
    await axioService(
      POST,
      SERVER_TIPS_TASKS_ENDPOINT.replace(':slug', tipId),
      {
        id: id,
        completed_at: completedAt?.format('yyyy-MM-DD HH:mm') || null,
        status: timelineStatus,
        _method: 'put',
      },
      getAuthToken()
    );
  };
}
