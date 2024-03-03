import {
  ServerTaskMeta,
  TaskDashboardMeta,
  TipsTaskDashboard,
  ServerEnrollmentTaskDashboard,
} from './dataTypes';

import moment from 'moment';
export const mapTaskMeta = (meta: ServerTaskMeta): TaskDashboardMeta => {
  const completed = meta.done + meta.skipped + meta.failed;
  return {
    total: meta.total,
    completed: completed,
    incomplete: meta.total - completed,
  };
};

const mapTimeline = (tasks: any[], date: string) => {
  const endDate: moment.Moment = moment(date);
  const filteredTask = tasks.map((task, index) => {
    return {
      ...task,
      timeline: task.timeline.filter((singleTimeline: any, index: number) => {
        if (singleTimeline.dueDate == null) return true;
        if (moment(singleTimeline.startDate).isSame(endDate, 'day')) {
          return true;
        }

        return false;
      }),
    };
  });

  return filteredTask;
};

export const mapTipsTaskDashboard = (
  tasks: any,
  enrollment: ServerEnrollmentTaskDashboard,
  to: any
): TipsTaskDashboard => {
  return {
    tasks: mapTimeline(tasks, to),
    tipsTitle: enrollment.tips.title,
    tipsSlug: enrollment.tips.slug,
    enrollmentId: enrollment.id,
    meta: {
      total: enrollment.total,
      completed: enrollment.completed,
      incomplete: enrollment.total - enrollment.completed,
      done: enrollment.done,
      failed: enrollment.failed,
      skipped: enrollment.skipped,
    },
  };
};

export {};
