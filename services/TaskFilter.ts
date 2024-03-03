import moment from 'moment';

export const getCompletedTasks = (tasks: Array<any>, date: any) => {
  return tasks.reduce((a: any, task: any) => {
    const timeline = filterTimelines(task.timeline, date, [0, 1, 2, 3]);
    const IncompletedTimeline = filterTimelines(timeline, date, [0]);
    if (timeline.length > 0 && IncompletedTimeline.length === 0) {
      return [...a, { ...task, timeline }];
    }
    return a;
  }, []);
};

export const getPendingTasks = (tasks: Array<any>, date: any) => {
  return tasks.reduce((a: any, task: any) => {
    const timeline = filterTimelines(task.timeline, date, [0, 1, 2, 3]);
    const incompletedTimeline = filterTimelines(timeline, date, [0]);
    if (timeline.length > 0 && incompletedTimeline.length > 0) {
      return [...a, { ...task, timeline }];
    }
    return a;
  }, []);
};

export const filterTaskByDate = (tasks: Array<any>, date: any) => {
  return tasks.reduce((a: any, task: any) => {
    const timeline = filterTimelines(task.timeline, date, [0, 1, 2, 3]);
    if (timeline.length > 0) {
      return [...a, { ...task, timeline }];
    }
    return a;
  }, []);
};

export const filterTimelines = (
  requestedTimelines: any,
  refDate: any,
  timelineStatus: Array<0 | 1 | 2 | 3>
) => {
  return requestedTimelines.filter(
    (timeline: any) =>
      timeline.startDate.isSameOrBefore(refDate, 'day') &&
      (!timeline.dueDate || timeline.dueDate.isSameOrAfter(refDate, 'day')) &&
      timelineStatus.includes(timeline.timelineStatus)
  );
};

export const getOverdueTasks = (tasks: Array<any>, date: any): Array<any> => {
  return tasks.reduce((allTasks: any, task: any) => {
    const timeline = getOverdueTimelines(task.timeline, date);
    if (timeline.length > 0) {
      allTasks.push({ ...task, timeline });
    }
    return allTasks;
  }, []);
};

export const isOverdueTaskPresentInTimeline = (iter: any, filterDate: any) => {
  const result: Array<any> = [];
  // tasks.forEach((task:any) => {
  //     task.timeline.forEach((timeline: any) => {
  //         if(timeline.timelineStatus === 0 && timeline.dueDate.isBefore(date)){
  //             result.push(task);
  //         }
  //     })
  // })
  return true;
};

const getOverdueTimelines = (timelines: Array<any>, refDate: any) => {
  const overdueTimelines: moment.Moment[] = [];
  return timelines.filter((timelineItr: any) => {
    if (!timelineItr.dueDate) {
      return false;
    }
    const date = timelineItr.dueDate.format('YYYY-MM-DD');
    if (timelineItr.dueDate.isBefore(refDate, 'day')) {
      overdueTimelines.push(date);
    }
    return overdueTimelines.includes(date);
  });
};

export const getOverdueDates = (tasks: Array<any>): Array<any> => {
  const overdueDates: any = [];
  const overdueTasks = getOverdueTasks(tasks, moment());
  overdueTasks.forEach((iter) => {
    const iterTimelines = Array.from(
      new Set(
        iter.timeline
          .map((timelineItr: any) => timelineItr.dueDate.format('YYYY-MM-DD'))
          .reverse()
      )
    );
    iterTimelines.forEach((timelineItr: any) => {
      overdueDates[timelineItr] = [...(overdueDates[timelineItr] || []), iter];
    });
  });
  return Object.assign({}, overdueDates);
};
