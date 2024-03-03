import {
  ServerEnrollmentTaskDashboard,
  ServerTaskObjTaskDashboard,
} from './../task-dashboard/dataTypes';
// import { ServerEnrollmentTaskDashboard } from '../task-dashboard/dataTypes';

export interface ServerEnrollmentReport extends ServerEnrollmentTaskDashboard {
  enrolled_by: any;
  sharing_enabled: boolean;
  sharing_url: string;
}

export interface EnrollmentReportResponse {
  data: EnrollmentReport;
}

export interface EnrollmentReport {
  tipsId: string;
  tipsTitle: string;
  tipsAuthor: string;
  enrolleeName: string;
  enrolleeUsername: string;
  tipsSlug: string;
  enrollmentId: string;
  status: string;
  completionProgress: number;
  enrollmentSession: string;
  done: number;
  skipped: number;
  failed: number;
  tasks: ServerTaskObjTaskDashboard[];
  completed: number;
  total: number;
  sharingEnable: boolean;
  sharingUrl: string;
}

export interface TimelineObj {
  id: string;
  startDate: moment.Moment;
  endDate: moment.Moment | string;
  completedAt: moment.Moment | string;
  status: number;
}

export interface ServerTimelineObj {
  id: string;
  start_date: string;
  due_date: string;
  completed_at: string;
  status: number;
}
export interface ServerTaskLogs {
  data: ServerTimelineObj[];
  meta: {
    current_page: number;
    last_page: number;
    from: any;
    links: any;
    path: any;
    per_page: number;
    to: number;
    total: number;
  };
  links: any;
}

export interface TaskLogs {
  data: TimelineObj[];
  meta: {
    currentPage: number;
    lastPage: number;
    total: number;
  };
}
