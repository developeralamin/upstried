import {
  Button,
  Checkbox,
  InputNumber,
  message,
  Radio,
  RadioChangeEvent,
  Select,
} from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import IntervalOccurrenceMonth from './partials/intervalOccurenceMonth/IntervalOccurenceMonth';
import IntervalOccurrenceWeek from './partials/intervalOccurenceWeek/IntervalOccurenceWeek';
import IntervalOccurrenceYear from './partials/intervalOccurenceYear/IntervalOccurenceYear';
import styles from './TaskRepeater.module.scss';

import RepeaterToText from '../../services/repeaterToText';
import RepeaterInterface from './task.interface';
import Timepicker from '../timepicker/Timepicker';

export interface TaskRepeaterProps {
  onUpdate: (value: RepeaterInterface) => void;
  onCancel?: () => void;
  repeater?: RepeaterInterface;
  notificationOn?: boolean;
}

const INITIAL_USER_INPUT: RepeaterInterface = {
  type: 'once',
  recurrence: {
    interval: {
      value: 1,
      unit: 'day',
    },
    dailyOccurrence: {
      count: 1,
      values: [],
    },
    intervalOccurrence: null,
    duration: {
      value: 1,
      unit: 'day',
    },
  },
};

const TaskRepeater: React.FC<TaskRepeaterProps> = (props) => {
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [dailyOccurrenceHasValues, setdailyOccurrenceHasValues] =
    useState<any>(false);

  const [shouldSelectDay, setShouldSelectDay] = useState(false);

  const [userInput, setUserInput] =
    useState<RepeaterInterface>(INITIAL_USER_INPUT);

  useEffect(() => {
    props.repeater
      ? setUserInput(props.repeater)
      : setUserInput(INITIAL_USER_INPUT);
    if (props.repeater?.recurrence) {
      const dailyOccurenceValuesHasItems =
        props.repeater?.recurrence.dailyOccurrence?.values &&
          props.repeater?.recurrence.dailyOccurrence.values?.length > 0
          ? true
          : false;
      setdailyOccurrenceHasValues(dailyOccurenceValuesHasItems);
    }
  }, [props]);

  const onTypeChange = (event: RadioChangeEvent) => {
    const type = event.target.value;

    setUserInput((prevState: any) => ({
      ...prevState,
      type,
      recurrence: { ...INITIAL_USER_INPUT.recurrence },
    }));
  };

  const onIntervalValueChange = (targetValue: any) => {
    setUserInput((prevState: any) => ({
      ...prevState,
      recurrence: {
        ...prevState.recurrence,
        interval: {
          ...prevState.recurrence.interval,
          value: targetValue || 1,
        },
      },
    }));
  };

  const onIntervalUnitChange = (targetValue: any) => {
    let intervalOccurrence: any = null;

    if (
      targetValue === 'month' ||
      targetValue === 'week' ||
      targetValue === 'year'
    ) {
      intervalOccurrence = {
        count: 1,
        values: [],
      };
    }

    setShouldSelectDay(false);

    setUserInput((prevState: any) => ({
      ...prevState,
      recurrence: {
        ...prevState.recurrence,
        interval: {
          ...prevState.recurrence.interval,
          unit: targetValue,
        },
        intervalOccurrence,
      },
    }));
  };

  const getDailyOccurenceValues = (
    count: number,
    values: Array<any>,
    isSelectTime?: boolean
  ) => {
    if (!isSelectTime) {
      return [];
    }
    for (let i = values.length; i < count; i++) {
      values.push('12:00');
    }
    return values.splice(0, count);
  };

  const onDailyOccurrenceCountChange = (
    targetValue: any,
    isSelectTime?: boolean
  ) => {
    setUserInput((prevState: any) => {
      const count = parseInt(targetValue || 1, 10);
      const values: any = getDailyOccurenceValues(
        count,
        prevState.recurrence.dailyOccurrence.values,
        isSelectTime === undefined ? dailyOccurrenceHasValues : isSelectTime
      );
      return {
        ...prevState,
        recurrence: {
          ...prevState.recurrence,
          dailyOccurrence: {
            count,
            values,
          },
        },
      };
    });
  };

  const onDailyOccurrenceHasValueChange = () => {
    setdailyOccurrenceHasValues((prevState: any) => {
      onDailyOccurrenceCountChange(
        userInput.recurrence?.dailyOccurrence.count,
        !prevState
      );

      return !prevState;
    });
  };

  const onDailyOccurrenceValuesChange = (time: any, index: number) => {
    if (!time && (index == null || index == undefined)) {
      return;
    }
    const values: Array<any> = [
      ...(userInput.recurrence?.dailyOccurrence?.values || []),
    ];
    if (!time) {
      values.splice(index, 1);
    }

    if (time) {
      values[index] = time ? time : null;
    }
    const updatedDailyOccurrence = {
      ...userInput.recurrence?.dailyOccurrence,
    };
    updatedDailyOccurrence.values = values;
    updatedDailyOccurrence.count = values.length;
    setUserInput((prevState: any) => ({
      ...prevState,
      recurrence: {
        ...prevState.recurrence,
        dailyOccurrence: updatedDailyOccurrence,
      },
    }));
  };

  const onDurationValueChange = (count: any) => {
    setUserInput((prevState: any) => ({
      ...prevState,
      recurrence: {
        ...prevState.recurrence,
        duration: {
          ...prevState.recurrence?.duration,
          value: count || 1,
        },
      },
    }));
  };

  const onDurationUnitChange = (unit: any) => {
    setUserInput((prevState: any) => ({
      ...prevState,
      recurrence: {
        ...prevState.recurrence,
        duration: {
          ...prevState.recurrence?.duration,
          unit,
        },
      },
    }));
  };

  const onInternalOccurrenceHasValueChange = () => {
    setShouldSelectDay((prevState: any) => {
      onIntervalOccurrenceCountChange(
        userInput.recurrence?.intervalOccurrence?.count,
        !prevState
      );
      return !prevState;
    });
  };

  const getIntervalOccurrenceValues = (
    count: number,
    values: Array<any>,
    isSelectTime?: boolean
  ) => {
    if (!isSelectTime) {
      return [];
    }
    const occurrenceDefaultValue: any =
      userInput.recurrence?.interval.unit === 'month'
        ? 1
        : moment().format('DD/MM');
    for (let i = values.length; i < count; i++) {
      values.push(occurrenceDefaultValue);
    }
    return values.splice(0, count);
  };

  const getWeekIntervalOccurrenceValues = (
    count: number,
    values: Array<any>,
    isSelectTime?: boolean
  ) => {
    if (!isSelectTime) {
      return [];
    }
    const uniqueValues: any = new Set(values);
    values = [...uniqueValues];
    // const weekDay = 0;
    // while (values.length < count && weekDay < 7) {
    //   if (!values.includes(weekDay)) {
    //     values.push(weekDay);
    //   }
    //   weekDay++;
    // }
    return values.splice(0, count);
  };

  const onWeekIntervalCountChange = (
    targetValue: any,
    isSelectTime?: boolean
  ) => {
    setUserInput((prevState: any) => {
      const count = parseInt(targetValue, 10);
      const values: any = getWeekIntervalOccurrenceValues(
        count,
        prevState.recurrence.intervalOccurrence.values,
        isSelectTime === undefined ? shouldSelectDay : isSelectTime
      );
      return {
        ...prevState,
        recurrence: {
          ...prevState.recurrence,
          intervalOccurrence: {
            count,
            values,
          },
        },
      };
    });
  };

  const onIntervalOccurrenceCountChange = (
    targetValue: any,
    isSelectTime?: boolean
  ) => {
    targetValue = targetValue || 1;

    if (userInput.recurrence?.interval.unit === 'week') {
      onWeekIntervalCountChange(targetValue, isSelectTime);
      return;
    }
    setUserInput((prevState: any) => {
      const count = parseInt(targetValue, 10);
      const values: any = getIntervalOccurrenceValues(
        count,
        prevState.recurrence.intervalOccurrence.values,
        isSelectTime === undefined ? shouldSelectDay : isSelectTime
      );
      return {
        ...prevState,
        recurrence: {
          ...prevState.recurrence,
          intervalOccurrence: {
            count,
            values,
          },
        },
      };
    });
  };

  const onIntervalOccurrenceMonthSelect = (day: any, index?: number) => {
    const values: any = [
      ...(userInput.recurrence?.intervalOccurrence?.values || []),
    ];
    if (index || index === 0) {
      values[index] = day;
    }
    setUserInput((prevState: any) => ({
      ...prevState,
      recurrence: {
        ...prevState.recurrence,
        intervalOccurrence: {
          ...prevState.recurrence?.intervalOccurrence,
          values,
        },
      },
    }));
  };

  const onIntervalOccurrenceYearSelect = (day: any, index: number) => {
    if (!day) {
      return;
    }
    const values: any = [
      ...(userInput.recurrence?.intervalOccurrence?.values || []),
    ];
    values[index] = day.format('MM/DD');
    setUserInput((prevState: any) => ({
      ...prevState,
      recurrence: {
        ...prevState.recurrence,
        intervalOccurrence: {
          ...prevState.recurrence?.intervalOccurrence,
          values,
        },
      },
    }));
  };

  const cancelRepeater = () => {
    setIsBoxOpen(false);
  };

  const setRepeater = () => {
    if (!validateDuration() || !validateInterval()) {
      return;
    }

    let taskRepeater: RepeaterInterface = { type: userInput.type };

    if (userInput.type !== 'once' && userInput.recurrence) {
      taskRepeater = { ...userInput };
    }
    props.onUpdate(taskRepeater);
    if (props.notificationOn) {
      message.success('Task Repeater Updated');
    }
    setIsBoxOpen(false);
  };

  const boxToggler = () => {
    setIsBoxOpen(!isBoxOpen);
  };
  const onIntervalOccurrenceWeekSelect = (day: any) => {
    const values: any = [
      ...(userInput.recurrence?.intervalOccurrence?.values || []),
    ];
    const intervalCount = userInput.recurrence?.intervalOccurrence?.count || 0;
    if (values.length < intervalCount && !values.includes(day)) {
      values.push(day);
    } else {
      if (values.includes(day)) {
        values.splice(values.indexOf(day), 1);
      }
    }
    setUserInput((prevState: any) => ({
      ...prevState,
      recurrence: {
        ...prevState.recurrence,
        intervalOccurrence: {
          ...prevState.recurrence?.intervalOccurrence,
          values,
        },
      },
    }));
  };

  const intervalOccurrenceMaxLength = (unit?: string) => {
    const intervalUnit = unit || userInput.recurrence?.interval?.unit;
    let maxLength = 1;
    switch (intervalUnit) {
      case 'week':
        maxLength = 7;
        break;
      case 'month':
        maxLength = 30;
        break;
      case 'year':
        maxLength = 365;
        break;
      default:
        break;
    }
    return maxLength;
  };

  const validateDuration = () => {
    if (!userInput.recurrence) {
      return true;
    }

    const intervalDays =
      userInput.recurrence?.interval.value *
      intervalOccurrenceMaxLength(userInput.recurrence?.interval.unit);
    const unitDays = intervalOccurrenceMaxLength(
      userInput.recurrence?.duration.unit
    );
    const durationDays = userInput.recurrence?.duration.value * unitDays;

    return durationDays >= intervalDays;
  };
  const repeaterToText = new RepeaterToText(userInput);

  const validateInterval = () => {
    if (
      !userInput.recurrence ||
      !userInput.recurrence?.intervalOccurrence ||
      !shouldSelectDay
    ) {
      return true;
    }
    const intervalValues = userInput.recurrence?.intervalOccurrence?.values;

    return (
      userInput.recurrence?.intervalOccurrence?.count == intervalValues?.length
    );
  };

  return (
    <div className={styles.TaskRepeater}>
      <Button className={styles.TogglerBtn} onClick={boxToggler}>
        <img className={styles.Toggler} src="/icons/repeater.svg" alt="Icon" />
      </Button>
      {isBoxOpen ? (
        <div className={styles.Box}>
          <h4 className={styles.Title}>Task Schedule</h4>
          <div>
            <div className={styles.TaskRepeater__type}>
              <Radio.Group onChange={onTypeChange} value={userInput.type}>
                <Radio value="once">Once</Radio>
                <Radio value="recurring">Recurring</Radio>
              </Radio.Group>
            </div>
            {userInput.recurrence ? (
              <p className={styles.Status}>* {repeaterToText.toLong()}</p>
            ) : null}

            <div
              className={
                userInput.type === 'recurring'
                  ? styles.EnableSettings
                  : styles.DisabledSettings
              }
            >
              <div className={styles.Overlay}></div>
              <div className={styles.InputWrapper}>
                <label htmlFor="interval">
                  <span>Every</span>
                </label>
                <div className={styles.InputBox}>
                  <div>
                    <InputNumber
                      min={1}
                      max={100}
                      id="interval"
                      defaultValue={userInput.recurrence?.interval?.value}
                      value={userInput.recurrence?.interval?.value}
                      onChange={onIntervalValueChange}
                    />
                  </div>
                  <Select
                    defaultValue={userInput.recurrence?.interval?.unit}
                    value={userInput.recurrence?.interval?.unit}
                    onChange={onIntervalUnitChange}
                    getPopupContainer={(triggerNode: HTMLElement) =>
                      triggerNode.parentNode as HTMLElement
                    }
                  >
                    <Select.Option value="day">Day</Select.Option>
                    <Select.Option value="week">Week</Select.Option>
                    <Select.Option value="month">Month</Select.Option>
                    <Select.Option value="year">Year</Select.Option>
                  </Select>
                </div>
              </div>
              {/* Interval Occurrence start */}
              {userInput.recurrence?.interval?.unit !== 'day' ? (
                <div className={styles.IntervalOccurenceWrapper}>
                  <div className={styles.InputWrapper}>
                    <label htmlFor="intervalOccurrence">
                      <span>Any</span>
                    </label>
                    <div className={styles.InputBox}>
                      <div>
                        <InputNumber
                          id="intervalOccurrence"
                          min={1}
                          value={
                            userInput.recurrence?.intervalOccurrence?.count
                          }
                          defaultValue={
                            userInput.recurrence?.intervalOccurrence?.count
                          }
                          max={intervalOccurrenceMaxLength()}
                          onChange={(ev: any) =>
                            onIntervalOccurrenceCountChange(ev)
                          }
                        />
                      </div>
                      <div>
                        <span className={styles.Times}>Day</span>
                        <Checkbox
                          onClick={onInternalOccurrenceHasValueChange}
                          checked={shouldSelectDay}
                        >
                          Select Day
                        </Checkbox>
                      </div>
                    </div>
                  </div>
                  {userInput.recurrence?.interval?.unit === 'week' &&
                    shouldSelectDay ? (
                    <>
                      <IntervalOccurrenceWeek
                        onSelect={onIntervalOccurrenceWeekSelect}
                        selectedValues={
                          userInput.recurrence?.intervalOccurrence?.values
                        }
                        maxLength={
                          userInput.recurrence?.intervalOccurrence?.count || 0
                        }
                      />
                      {!validateInterval() &&
                        userInput.recurrence?.intervalOccurrence?.count ? (
                        <span className={styles.WeekError}>
                          You must select{' '}
                          {userInput.recurrence?.intervalOccurrence?.count}{' '}
                          {repeaterToText.plural(
                            'weekday',
                            userInput.recurrence?.intervalOccurrence?.count
                          )}
                        </span>
                      ) : null}
                      {!validateInterval() &&
                        !userInput.recurrence?.intervalOccurrence?.count ? (
                        <span className={styles.WeekError}>
                          You must select at least one weekday
                        </span>
                      ) : null}
                    </>
                  ) : null}
                  {userInput.recurrence?.interval?.unit === 'month' &&
                    shouldSelectDay ? (
                    <IntervalOccurrenceMonth
                      onSelect={onIntervalOccurrenceMonthSelect}
                      selectedValues={
                        userInput.recurrence?.intervalOccurrence?.values
                      }
                    />
                  ) : null}

                  {userInput.recurrence?.interval?.unit === 'year' &&
                    shouldSelectDay ? (
                    <IntervalOccurrenceYear
                      onSelect={onIntervalOccurrenceYearSelect}
                      selectedValues={
                        userInput.recurrence?.intervalOccurrence?.values
                      }
                    />
                  ) : null}
                </div>
              ) : null}

              {/* Interval Occurrence end */}
              {/* Daily Occurrence start */}

              <div className={styles.DailyOccurence}>
                <div className={styles.InputWrapper}>
                  <label htmlFor="dailyOccurrence">
                    <span>Repeat</span>
                  </label>
                  <div className={styles.InputBox}>
                    <InputNumber
                      min={1}
                      id="dailyOccurrence"
                      max={8}
                      defaultValue={
                        userInput.recurrence?.dailyOccurrence?.count
                      }
                      value={userInput.recurrence?.dailyOccurrence?.count}
                      onChange={onDailyOccurrenceCountChange}
                    />
                    <div>
                      <span className={styles.Times}>times a day</span>
                      <Checkbox
                        onClick={onDailyOccurrenceHasValueChange}
                        checked={dailyOccurrenceHasValues}
                      >
                        Select Time
                      </Checkbox>
                    </div>
                  </div>
                </div>
                {dailyOccurrenceHasValues ? (
                  <div
                    className={styles.TaskRepeater__input__occurence__values}
                  >
                    {userInput.recurrence?.dailyOccurrence?.values?.map(
                      (value: any, index: any) => (
                        <Timepicker
                          value={value}
                          onChange={(ev: any) =>
                            onDailyOccurrenceValuesChange(ev, index)
                          }
                          key={index}
                        />
                      )
                    )}
                  </div>
                ) : null}
              </div>

              <div className={styles.InputWrapper}>
                <label htmlFor="duration">
                  <span>For</span>
                </label>
                <div className={styles.InputBox}>
                  <div>
                    <InputNumber
                      min={1}
                      max={365}
                      id="duration"
                      onChange={onDurationValueChange}
                      value={userInput.recurrence?.duration.value}
                      defaultValue={userInput.recurrence?.duration.value}
                    />
                  </div>
                  <Select
                    onChange={onDurationUnitChange}
                    value={userInput.recurrence?.duration.unit}
                    defaultValue={userInput.recurrence?.interval.unit}
                    getPopupContainer={(triggerNode: HTMLElement) =>
                      triggerNode.parentNode as HTMLElement
                    }
                  >
                    <Select.Option value="day">Day</Select.Option>
                    <Select.Option value="week">Week</Select.Option>
                    <Select.Option value="month">Month</Select.Option>
                    <Select.Option value="year">Year</Select.Option>
                  </Select>
                </div>
              </div>
              {!validateDuration() ? (
                <span className="text-error">
                  Duration must be greater than or equal interval
                </span>
              ) : null}
            </div>
          </div>
          <div className={styles.TaskRepeater__footer}>
            <Button onClick={cancelRepeater} className={styles.BtnCancel}>
              Cancel
            </Button>
            <Button
              className={styles.BtnSet}
              onClick={setRepeater}
              disabled={!validateDuration() || !validateInterval()}
            >
              Set
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TaskRepeater;
