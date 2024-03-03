import { Pie } from '@ant-design/plots';
import { message, Modal } from 'antd';
import clsx from 'clsx';
import moment from 'moment';
import Link from 'next/link';
import { useState } from 'react';
import {
  EnrollmentTipsMeta,
  TaskDashboardObj,
  TipsTaskDashboard,
} from '../../../api/task-dashboard/dataTypes';
import TaskDashboardAPI from '../../../api/task-dashboard/request';
import { TimelineTaskObj } from '../../../api/tasks/dataTypes';
import { TaskAPI } from '../../../api/tasks/request';
import { DONE, FAILED, PENDING, SKIPPED } from '../../../config/constants';
import { updateTimeTaskCompleteInterface } from '../../../interfaces/practice.interface';
import { filterTimelines } from '../../../services/TaskFilter';
import PracticeTaskItem from '../../practiceTasksList/practiceTaskItem/PracticeTaskItem';
import { getChartConfig, getChartData } from '../utilities/chart';
import { getTasksCompletionCount } from '../utilities/TipsFilter';
import styles from './DashboardTips.module.scss';

/* eslint-disable jsx-a11y/anchor-is-valid */
interface TodoTipsProps {
  completedTips?: boolean;
  tips: TipsTaskDashboard;
  activeViewTask?: string;
  setActiveViewTask: (slug: string) => void;
  tipsList: TipsTaskDashboard[];
  setTipsList: (tipsList: TipsTaskDashboard[]) => void;
  filterDate?: moment.Moment;
}
const DashboardTips = (props: TodoTipsProps) => {
  const {
    tips,
    completedTips,
    activeViewTask,
    setActiveViewTask,
    tipsList,
    setTipsList,
    filterDate,
  } = props;
  const { tasks } = tips;
  const { tipsTitle } = tips;
  const { done, skipped, failed, incomplete, completed, total } = tips.meta;
  const [isModalVisible, setIsModalVisible] = useState(false);

  function onCheck() {
    setIsModalVisible(true);
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const tasksCompletionCount = getTasksCompletionCount(tips);

  const chartData = getChartData(done, skipped, failed, incomplete);
  const tipsCompletedPercent = Math.ceil((completed * 100) / total);

  const chartConfig = getChartConfig(
    chartData,
    tipsCompletedPercent,
    completedTips
  );

  const onViewTask = (tips: TipsTaskDashboard) => {
    if (activeViewTask !== tips.tipsSlug) setActiveViewTask(tips.tipsSlug);
    else setActiveViewTask('');
  };
  const getPendingTasks = (
    tips: TipsTaskDashboard,
    filterDate?: moment.Moment
  ) => {
    return tips.tasks.filter((task: TaskDashboardObj) => {
      const pendingTimelines = filterTimelines(
        task.timeline,
        !filterDate ? moment() : filterDate,
        [0]
      );
      return pendingTimelines.length > 0;
    });
  };
  const getCompletedTasks = (
    tips: TipsTaskDashboard,
    filterDate?: moment.Moment
  ) => {
    return tips.tasks.filter((task: TaskDashboardObj) => {
      const completedTimelines = filterTimelines(
        task.timeline,
        !filterDate ? moment() : filterDate,
        [1, 2, 3]
      );
      return completedTimelines.length === task.timeline.length;
    });
  };

  const updateMetaField = (
    timelineStatus: number,
    prevStatus: number,
    updatedMeta: EnrollmentTipsMeta
  ) => {
    if (timelineStatus > 0) {
      updatedMeta.completed += 1;
      updatedMeta.incomplete -= 1;
      switch (timelineStatus) {
        case DONE:
          updatedMeta.done += 1;
          break;
        case FAILED:
          updatedMeta.failed += 1;
          break;

        case SKIPPED:
          updatedMeta.skipped += 1;
          break;
      }
    } else {
      updatedMeta.completed -= 1;
      updatedMeta.incomplete += 1;
      switch (prevStatus) {
        case DONE:
          updatedMeta.done -= 1;
          break;
        case FAILED:
          updatedMeta.failed -= 1;
          break;

        case SKIPPED:
          updatedMeta.skipped -= 1;
          break;
      }
    }
  };
  const getModifiedTasks = (
    requestedTasks: TaskDashboardObj[],
    taskId: string,
    timelineId: string,
    timelineStatus: number,
    completedAt: moment.Moment | null
  ) => {
    return requestedTasks.map((task: TaskDashboardObj) => {
      if (taskId === task.id) {
        const taskMeta = { ...task.meta };
        if (timelineStatus > 0) {
          taskMeta.completed += 1;
          taskMeta.incomplete -= 1;
        } else {
          taskMeta.completed -= 1;
          taskMeta.incomplete += 1;
        }
        return {
          ...task,
          meta: taskMeta,
          timeline: task.timeline.map((timeline: TimelineTaskObj) => {
            if (timelineId !== timeline.id) {
              return timeline;
            }
            return {
              ...timeline,
              completedAt,
              timelineStatus,
            };
          }),
        };
      }
      return task;
    });
  };
  const findTipsIndex = (
    tipsList: TipsTaskDashboard[],
    tips: TipsTaskDashboard
  ) => {
    for (let i = 0; i < tipsList.length; i++) {
      if (tipsList[i].tipsSlug === tips.tipsSlug) return i;
    }
  };

  const onTaskAction: updateTimeTaskCompleteInterface = async (
    taskId,
    timelineId,
    prevStatus,
    timelineStatus
  ) => {
    const completedAt = timelineStatus === PENDING ? null : moment();
    const modifiedTasks = getModifiedTasks(
      tasks,
      taskId,
      timelineId,
      timelineStatus,
      completedAt
    );
    const tipsIndex = findTipsIndex(tipsList, tips);
    try {
      const updatedTipsList: TipsTaskDashboard[] = [...tipsList];
      const updatedMeta: EnrollmentTipsMeta = { ...tips.meta };

      updateMetaField(timelineStatus, prevStatus, updatedMeta);
      const updatedTips: TipsTaskDashboard = {
        ...updatedTipsList[tipsIndex as number],
        tasks: modifiedTasks,
        meta: updatedMeta,
      } as TipsTaskDashboard;
      updatedTipsList[tipsIndex as number] = updatedTips;

      setTipsList(updatedTipsList);

      message.success(
        completedAt ? 'Task marked as complete!' : 'Task marked as incomplete!'
      );
      await new TaskAPI().markComplete(
        tips.tipsSlug,
        timelineId,
        completedAt,
        timelineStatus
      );
    } catch (exception) {
      setTipsList([...tipsList]);
      console.error(exception);
      message.error('Oops! Something went wrong!!!');
    }
  };

  const pendingTasks = getPendingTasks(tips, filterDate);
  const completedTasks = getCompletedTasks(tips, filterDate);

  const getUpdatedTimelines = (pendingTasks: TaskDashboardObj[]) => {
    const updatedTimelines: any = [];
    const updatedTimelineIds: any = {};
    pendingTasks.forEach((pendingTask: TaskDashboardObj) => {
      pendingTask.timeline.forEach((timeline: TimelineTaskObj) => {
        if (timeline.timelineStatus === PENDING) {
          const updatedTimeline = {
            id: timeline.id,
            completed_at: moment(),
            status: DONE,
          };
          updatedTimelineIds[timeline.id] = true;
          updatedTimelines.push(updatedTimeline);
        }
      });
    });
    return { updatedTimelines, updatedTimelineIds };
  };

  const getModifiedTasksAllDone = (
    tips: TipsTaskDashboard,
    updatedTimelineIds: string[]
  ) => {
    const updatedTasks = [...tips.tasks];
    for (let i = 0; i < updatedTasks.length; i++) {
      const updatedTask = { ...updatedTasks[i] }; //has timeline field
      const updatedTimelines = [...updatedTask.timeline];
      const meta = { ...updatedTask.meta };
      let isTaskChangeAble = false;
      for (let j = 0; j < updatedTimelines.length; j++) {
        const updatedTimeline = { ...updatedTimelines[j] };
        if (updatedTimeline.id in updatedTimelineIds) {
          updatedTimeline.completedAt = moment();
          updatedTimeline.timelineStatus = 1;
          updatedTimelines[j] = updatedTimeline;
          meta.completed += 1;
          meta.incomplete -= 1;
          isTaskChangeAble = true;
        }
      }
      if (isTaskChangeAble) {
        // update task only if timeline is marked as done/(fail)
        updatedTask.meta = meta;
        updatedTask.timeline = updatedTimelines;
        updatedTasks[i] = updatedTask;
      }
    }
    return updatedTasks;
  };

  const onMarkAllDone = async (
    tips: TipsTaskDashboard,
    pendingTasks: TaskDashboardObj[]
  ) => {
    if (filterDate && filterDate.isAfter()) {
      return;
    }
    const { updatedTimelines, updatedTimelineIds } =
      getUpdatedTimelines(pendingTasks);

    const updatedTimelinesLength = updatedTimelines.length;

    const markedAllDoneTasks = {
      tasks: updatedTimelines,
    };
    const modifiedTasks = getModifiedTasksAllDone(tips, updatedTimelineIds);
    const updatedTipsList = [...tipsList];
    //tips meta
    const updatedMeta = {
      ...tips.meta,
      completed: tips.meta.completed + updatedTimelinesLength,
      done: tips.meta.done + updatedTimelinesLength,
      incomplete: tips.meta.incomplete - updatedTimelinesLength,
    };
    const tipsIndex = findTipsIndex(tipsList, tips);
    const updatedTips = {
      ...updatedTipsList[tipsIndex as number],
      tasks: modifiedTasks,
      meta: updatedMeta, //update tasks meta
    };
    updatedTipsList[tipsIndex as number] = updatedTips;
    setTipsList(updatedTipsList);
    message.success('Marked tasks as all Done!');
    try {
      await TaskDashboardAPI.markAllDone(tips.enrollmentId, markedAllDoneTasks);
    } catch (exception) {
      setTipsList([...tipsList]);
      console.error(exception);
      message.error('Oops! Something went wrong!!!');
    }
  };
  const ModalTitle = (props: any) => {
    const { pendingTasks } = props;
    return (
      <div className={styles.ModalTitle}>
        <p className={styles.TaskTodoText}>Task to do</p>
        <button
          className={styles.MarkAllDoneBtn}
          onClick={() => {
            onMarkAllDone(tips, pendingTasks);
          }}
        >
          <svg
            width="11"
            height="9"
            viewBox="0 0 11 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.73608 8.44016L0.161084 4.86516C-0.0536948 4.65038 -0.0536948 4.30214 0.161084 4.08734L0.938883 3.30952C1.15366 3.09472 1.50192 3.09472 1.7167 3.30952L4.125 5.71779L9.28329 0.559522C9.49807 0.344743 9.84633 0.344743 10.0611 0.559522L10.8389 1.33734C11.0537 1.55212 11.0537 1.90036 10.8389 2.11516L4.51391 8.44018C4.2991 8.65496 3.95086 8.65496 3.73608 8.44016Z"
              fill="white"
            />
          </svg>
          <p className={styles.MarkDoneText}>Mark all as Done</p>
        </button>
      </div>
    );
  };

  return (
    <div className={styles.TipsContainer}>
      <div className={styles.Tips}>
        <div className={styles.TipsLeft}>
          <div className={styles.TipsTitle}>
            <input
              type="checkbox"
              onChange={(e) => {
                if (filterDate?.isAfter(moment(), 'days')) return;
                onCheck();
              }}
              checked={completedTips ? true : false}
              disabled={completedTips ? true : false}
              className={clsx({
                [styles.CheckboxDefaultCursor]: completedTips,
              })}
            />
            <p
              className={clsx({
                [styles.TipsTitleInComplete]: true,
                [styles.TipsTitleCompleted]: completedTips,
              })}
            >
              {' '}
              {tipsTitle}
            </p>
          </div>
          <Modal
            title={null}
            visible={isModalVisible}
            footer={null}
            maskClosable={true}
            onCancel={handleCancel}
            closable={false}
            bodyStyle={{ borderRadius: '10px' }}
            style={{
              position: 'relative',
              left: '175px',
              top: '206px',
              minWidth: '60vw',
            }}
          >
            <ModalTitle pendingTasks={pendingTasks} />
            {pendingTasks.map((task: TaskDashboardObj, index: number) => {
              return (
                <PracticeTaskItem
                  loading={false}
                  task={task}
                  key={`practice-task-${index}`}
                  filterDate={!filterDate ? moment() : filterDate}
                  isComplete={false}
                  onTaskAction={onTaskAction}
                />
              );
            })}
            {completedTasks.length > 0 && (
              <div className={styles.CompletedTasksText}>Completed</div>
            )}
            {completedTasks.length > 0 &&
              completedTasks.map((task: TaskDashboardObj, index: number) => (
                <PracticeTaskItem
                  loading={false}
                  task={task}
                  key={`practice-task-${index}`}
                  filterDate={!filterDate ? moment() : filterDate}
                  isComplete={true}
                  onTaskAction={onTaskAction}
                />
              ))}
          </Modal>

          <div className={styles.RemainingTasks}>
            {tasksCompletionCount < tips.tasks.length ? (
              !filterDate?.isBefore(moment(), 'days') ? (
                <p
                  className={clsx({
                    [styles.InCompletedTips]: true,
                  })}
                >
                  <span>{tips.tasks.length - tasksCompletionCount} Tasks</span>{' '}
                  to do today
                </p>
              ) : (
                <p
                  className={clsx({
                    [styles.InCompletedTips]: true,
                  })}
                >
                  <span className={styles.OverdueRemainingTasksText}>
                    {tips.tasks.length - tasksCompletionCount} tasks
                  </span>{' '}
                  remained
                </p>
              )
            ) : (
              <p
                className={clsx({
                  [styles.CompletedTips]: true,
                })}
              >
                Done for today
              </p>
            )}
            <div className={styles.VerticalLine}></div>
            <button
              className={clsx({
                [styles.ViewTask]: true,
                [styles.ViewTaskCompleted]: completedTips,
              })}
              onClick={() => {
                onViewTask(tips);
              }}
              disabled={completedTips}
            >
              {activeViewTask === tips.tipsSlug ? 'Hide Tasks' : 'View Tasks'}
            </button>
            <div className={styles.VerticalLine}></div>
            <Link href={`/books/enrollments/${tips.enrollmentId}/practice`}>
              <a
                style={{
                  backgroundColor: completedTips ? '#BBBAC7' : '#4A77FD',
                }}
                className={styles.RemainingTaskRight}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.68522 9.16303C4.82052 8.92066 4.82052 8.62549 4.68522 8.38312L0.897501 1.59816C0.511511 0.906736 1.25712 0.134806 1.96152 0.496581L16.6907 8.06144C17.2701 8.35899 17.2701 9.18715 16.6907 9.4847L1.96152 17.0496C1.25712 17.4113 0.511514 16.6394 0.897504 15.948L4.68522 9.16303Z"
                    fill="white"
                  />
                </svg>
              </a>
            </Link>
          </div>
        </div>
        <div className={styles.TipsRight}>
          {/* @ts-expect-error: though legend accepts false, still ts throws error */}
          <Pie {...chartConfig} />
        </div>
      </div>
      {activeViewTask === tips.tipsSlug && (
        <div className={styles.TasksWrapper}>
          <hr className={styles.TipsTasksSeperator} />
          {pendingTasks.map((task: TaskDashboardObj, index: number) => {
            return (
              <PracticeTaskItem
                loading={false}
                task={task}
                key={`practice-task-${index}`}
                filterDate={moment()}
                isComplete={false}
                onTaskAction={onTaskAction}
              />
            );
          })}
          {completedTasks.length > 0 && <div>Completed</div>}
          {completedTasks.length > 0 &&
            completedTasks.map((task: TaskDashboardObj, index: number) => (
              <PracticeTaskItem
                loading={false}
                task={task}
                key={`practice-task-${index}`}
                filterDate={moment()}
                isComplete={true}
                onTaskAction={onTaskAction}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default DashboardTips;
