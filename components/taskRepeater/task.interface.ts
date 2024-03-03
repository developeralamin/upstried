export interface RepeaterInterval {
  value: number;
  unit: string;
}
export interface RepeaterOccurrence {
  count: number;
  values?: Array<any>;
}
export interface TaskRecurrence {
  interval: RepeaterInterval;
  intervalOccurrence?: RepeaterOccurrence | null;
  dailyOccurrence: RepeaterOccurrence;
  duration: RepeaterInterval;
}

export default interface TaskRepeater {
  type: string;
  recurrence?: TaskRecurrence;
}
