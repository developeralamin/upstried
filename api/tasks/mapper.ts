import moment from 'moment';
import {
  ServerTaskObj,
  ServerTimelineTaskObj,
  TaskObj,
  TimelineTaskObj,
} from './dataTypes';

export const mapTimelineTaskFromServer = (
  serverTimelineTask: ServerTimelineTaskObj
): TimelineTaskObj => {
  const dueDate = serverTimelineTask.due_date
    ? moment(moment.utc(serverTimelineTask.due_date).format('yyyy-MM-DD HH:mm'))
    : null;
  return {
    id: serverTimelineTask.id,
    startDate: moment(
      moment.utc(serverTimelineTask.start_date).format('yyyy-MM-DD HH:mm')
    ),
    dueDate,
    completedAt: serverTimelineTask.completed_at
      ? moment(
          moment.utc(serverTimelineTask.completed_at).format('yyyy-MM-DD HH:mm')
        )
      : null,
    timelineStatus: serverTimelineTask.status,
    label: dueDate ? dueDate.format('hh:mm a') : 'Once',
  };
};

export const mapTaskFromServer = (serverTask: ServerTaskObj): TaskObj => {
  return {
    id: serverTask.id,
    title: serverTask.title,
    attachments: serverTask.attachments || [],
    repetition: {
      shortForm: serverTask.repetition.short_form,
      longForm: serverTask.repetition.long_form,
    },
    refId: serverTask.ref_id || null,
    timeline: serverTask.timeline.map((iter) =>
      mapTimelineTaskFromServer(iter)
    ),
  };
};
