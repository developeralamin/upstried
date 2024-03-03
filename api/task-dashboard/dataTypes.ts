import { numeral } from './../../services/util';
import {
  ServerTaskObj,
  ServerTasksObj,
  ServerTimelineTaskObj,
  TaskObj,
  TimelineTaskObj,
} from '../tasks/dataTypes';

export interface ServerTaskObjTaskDashboard extends ServerTaskObj {
  meta: ServerTaskMeta;
}

export interface TaskDashboardObj extends TaskObj {
  meta: TaskDashboardMeta;
}
export interface TaskDashboardMeta {
  total: number;
  completed: number;
  incomplete: number;
}
export interface ServerEnrollmentTaskDashboard {
  id: string;
  start_at: string;
  end_at: string;
  total: number;
  completed: number;
  done: number;
  skipped: number;
  failed: number;
  re_enrollable: boolean;
  tips: any;
  tasks: ServerTaskObjTaskDashboard[];
}

export interface ResponseAll {
  data: TipsTaskDashboard[];
}

export interface TipsTaskDashboard {
  tasks: TaskDashboardObj[];
  tipsTitle: string;
  tipsSlug: string;
  enrollmentId: string;
  meta: EnrollmentTipsMeta;
}

export interface EnrollmentTipsMeta {
  total: number;
  completed: number;
  incomplete: number;
  done: number;
  failed: number;
  skipped: number;
}

export interface ServerTaskMeta {
  total: number;
  done: number;
  failed: number;
  skipped: number;
}
export interface EnrollmentTaskDashboard {
  tasks: ServerTaskObjTaskDashboard[];
  tipsTitle: string;
  tipsSlug: string;
  enrollmentId: string;
  meta: TaskDashboardMeta;
}

export {};
