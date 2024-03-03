export interface AttachmentObj {
  url: string;
  type: string;
}

export interface TimelineTaskObj {
  id: string;
  startDate: moment.Moment;
  dueDate: moment.Moment | null;
  completedAt: moment.Moment | null;
  timelineStatus: 0 | 1 | 2 | 3;
  label: string;
}

export interface TaskObj {
  id: string;
  title: string;
  attachments: AttachmentObj[];
  repetition: {
    shortForm: string;
    longForm: string;
  };
  refId?: string | null;
  timeline: TimelineTaskObj[];
}

/** server */

export interface ServerTimelineTaskObj {
  id: string;
  start_date: moment.Moment;
  due_date: moment.Moment | null;
  completed_at: moment.Moment | null;
  status: 0 | 1 | 2 | 3;
}

export interface ServerTaskObj {
  id: string;
  title: string;
  attachments: AttachmentObj[];
  repetition: {
    short_form: string;
    long_form: string;
  };
  ref_id?: string | null;
  timeline: ServerTimelineTaskObj[];
}

export interface ServerTasksObj {
  data: ServerTaskObj[];
  meta: {
    total: number;
    completed: number;
    incomplete: number;
  };
}
