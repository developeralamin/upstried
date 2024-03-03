import TaskRepeater from './../components/taskRepeater/task.interface';

export default class RepeaterToText {
  repeater: TaskRepeater | null;

  constructor(repeater: TaskRepeater) {
    this.repeater = repeater;
  }

  toShort() {
    if (this.repeater?.type == 'once') {
      return 'Once';
    }

    const intervalUnit = this.repeater?.recurrence?.interval?.unit || '';

    if (intervalUnit?.toLowerCase() == 'day') {
      return `Daily ${this.repeater?.recurrence?.dailyOccurrence.count}x`;
    }

    const frequency = this.repeater?.recurrence?.intervalOccurrence?.count;

    return `${this.capitalizeFirstLetter(intervalUnit)} ${frequency}x`;
  }

  toLong() {
    if (this.repeater?.type == 'once') {
      return 'Once';
    }
    let intervalOccurrence = '';

    const intervalCount =
      this.repeater?.recurrence?.intervalOccurrence?.count || 0;

    if (intervalCount) {
      intervalOccurrence = `${intervalCount} ${this.plural(
        'day',
        intervalCount
      )}`;
    }
    const intervalValue = this.repeater?.recurrence?.interval.value || 0;
    const dailyOccCount = this.repeater?.recurrence?.dailyOccurrence.count || 0;
    const durationValue = this.repeater?.recurrence?.duration.value || 0;

    return `Repeat on every 
      ${intervalValue} ${this.plural(
      this.repeater?.recurrence?.interval.unit,
      intervalValue
    )}
        ${intervalOccurrence} 
        ${dailyOccCount} ${this.plural('time', dailyOccCount)} a day 
        for ${durationValue} ${this.plural(
      this.repeater?.recurrence?.duration.unit,
      durationValue
    )} 
         `;
  }

  unitAdjective(unit: string) {
    if (unit == 'day') {
      return 'daily';
    }

    return `${unit}ly`;
  }

  plural(unit: any, count: any) {
    if (count == 0 || count == 1) {
      return unit;
    }

    return `${unit}s`;
  }

  capitalizeFirstLetter(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
