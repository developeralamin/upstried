import {
  EnrollmentReport,
  ServerEnrollmentReport,
  TaskLogs,
  ServerTaskLogs,
  TimelineObj,
  ServerTimelineObj,
} from './dataTypes';
import moment from 'moment';

const setStatus = (
  endDate: moment.Moment | null,
  completed: boolean
): string => {
  if (completed) return 'Completed';
  else {
    if (endDate === null || endDate.isAfter(moment())) return 'In Progress';
  }
  return 'InComplete';
};

export const mapTimeline = (timelines: ServerTimelineObj[]): TimelineObj[] => {
  return timelines.map((timeline: ServerTimelineObj) => {
    return {
      id: timeline.id,
      startDate: moment(timeline.start_date),
      // endDate: moment(timeline.due_date),
      endDate: timeline.due_date ? moment(timeline.due_date) : '',
      completedAt: timeline.completed_at ? moment(timeline.completed_at) : '',
      status: timeline.status,
    };
  });
};

export const mapTaskLogs = (taskLogs: ServerTaskLogs): TaskLogs => {
  return {
    data: mapTimeline(taskLogs.data),
    meta: {
      currentPage: taskLogs.meta.current_page,
      lastPage: taskLogs.meta.last_page,
      total: taskLogs.meta.total,
    },
  };
};

export const mapEnrollmentReport = (
  enrollment: ServerEnrollmentReport
): EnrollmentReport => {
  return {
    tipsId: enrollment.tips.id,
    tipsTitle: enrollment.tips.title,
    tipsAuthor: enrollment.tips.author.name,
    enrolleeName: enrollment.enrolled_by.name,
    enrolleeUsername: enrollment.enrolled_by.username,
    enrollmentId: enrollment.id,
    tipsSlug: enrollment.tips.slug,
    status: setStatus(
      enrollment.end_at ? moment(enrollment.end_at) : null,
      enrollment.completed === enrollment.total
    ),
    completionProgress: Math.ceil(
      (enrollment.completed * 100) / enrollment.total
    ),
    enrollmentSession: `${moment(enrollment.start_at).format(
      'DD MMM, YYYY'
    )} - ${
      enrollment.end_at === null
        ? 'any time'
        : moment(enrollment.end_at).format('DD MMM, YYYY')
    }`,
    done: enrollment.done,
    skipped: enrollment.skipped,
    failed: enrollment.failed,
    tasks: enrollment.tasks,
    completed: enrollment.completed,
    total: enrollment.total,
    sharingEnable: enrollment.sharing_enabled,
    sharingUrl: enrollment.sharing_url,
  };
};
