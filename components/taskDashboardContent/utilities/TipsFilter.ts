import {
  TipsTaskDashboard,
  TaskDashboardObj,
} from './../../../api/task-dashboard/dataTypes';
export const getTasksCompletionCount = (tips: TipsTaskDashboard) => {
  let countTasksCompletion = 0;

  tips.tasks.forEach((task: TaskDashboardObj) => {
    if (task.meta.total === task.meta.completed) {
      countTasksCompletion++;
    }
  });
  return countTasksCompletion;
};
export const sortTipsList = (data: TipsTaskDashboard[]) => {
  const completedTipsList: TipsTaskDashboard[] = [];
  const inCompleteTipsList: TipsTaskDashboard[] = [];
  data.forEach((tips: TipsTaskDashboard) => {
    if (getTasksCompletionCount(tips) === tips.tasks.length) {
      completedTipsList.push(tips);
    } else {
      inCompleteTipsList.push(tips);
    }
  });

  return { inCompleteTipsList, completedTipsList };
};
