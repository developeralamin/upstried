export interface updateTaskCompleteInterface {
  (
    timelineId: string,
    completedAt: moment.Moment | null,
    timelineStatus: 0 | 1 | 2 | 3
  ): void;
}

export interface updateTimeTaskCompleteInterface {
  (
    taskId: string,
    timelineId: string,
    prevStatus: 0 | 1 | 2 | 3,
    timelineStatus: 0 | 1 | 2 | 3
  ): void;
}
