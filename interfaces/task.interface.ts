
export interface RepeaterIntervalInterface {
  value: number;
  unit: string;
}
export interface RepeaterOccurrenceInterface {
  count: number;
  values?: Array<any>;
}
export interface TaskRecurrenceInterface {
  interval: RepeaterIntervalInterface;
  intervalOccurrence?: RepeaterOccurrenceInterface | null;
  dailyOccurrence: RepeaterOccurrenceInterface;
  duration: RepeaterIntervalInterface;
}

export interface TaskRepeaterInterface {
  type: string;
  recurrence?: TaskRecurrenceInterface;
}

export interface RepetitionInterface {
  shortForm: string;
  longForm: string;
}

export default interface TaskInterface {
  id: string;
  title: string;
  attachments: any;
  repeater: TaskRepeaterInterface;
  repetition: RepetitionInterface;
}

export interface TaskInterfaceWithEditMode extends TaskInterface {
  uuid?: string;
  editMode: boolean;
}

