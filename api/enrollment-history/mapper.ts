import moment from 'moment';
import { HistoyObj, ServerHistoryObj } from './dataTypes';

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

export const mapEnrollmentHistory = (
  enrollmentHistory: ServerHistoryObj[]
): HistoyObj[] => {
  return enrollmentHistory.map((enrollment: any) => {
    return {
      id: enrollment.id,
      startDate: moment(enrollment.start_at).format('DD MMMM, YYYY'),
      endDate: enrollment.end_at
        ? moment(enrollment.end_at).format('DD MMMM, YYYY')
        : 'any time',
      status: setStatus(
        enrollment.end_at ? moment(enrollment.end_at) : null,
        enrollment.completed === enrollment.total
      ),
      progress: Math.ceil((enrollment.completed * 100) / enrollment.total),
    };
  });
};
