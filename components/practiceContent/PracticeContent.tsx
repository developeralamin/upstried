/* eslint-disable jsx-a11y/alt-text */
import { DatePicker, message, Spin, Tabs } from 'antd';
import clsx from 'clsx';
import moment from 'moment';
import { useRouter } from 'next/router';
import React from 'react';
import { TaskObj } from '../../api/tasks/dataTypes';
import { TaskAPI } from '../../api/tasks/request';
import { updateTimeTaskCompleteInterface } from '../../interfaces/practice.interface';
import { filterTaskByDate } from '../../services/TaskFilter';
import PracticeOverdue from '../practiceOverdue/PracticeOverdue';
import PracticeTasksList from '../practiceTasksList/PracticeTasksList';
import styles from './PracticeContent.module.scss';
import { PENDING, DONE, FAILED, SKIPPED } from '../../config/constants';
import TaskDashboardAPI from '../../api/task-dashboard/request';
interface PracticeContentProps {
  tipSlug: string;
  setProgressStatus: (requested: any) => void;
  enrollmentId: string | undefined;
  tasks?: any;
  setTasks?: any;
  loading?: boolean;
  setLoading?: any;
}

const PracticeContent: React.FC<PracticeContentProps> = (
  props: PracticeContentProps
) => {
  const router = useRouter();
  const { tab } = router.query;
  const currentTabKey = tab === 'overdue' ? '2' : '1';
  const {
    tipSlug,
    setProgressStatus,
    enrollmentId,
    tasks,
    setTasks,
    loading,
    setLoading,
  } = props;
  // const [tasks, setTasks] = React.useState<TaskObj[]>([]);
  const [filterDate, setFilterDate] = React.useState<moment.Moment>(moment());
  // const [loading, setLoading] = React.useState<boolean>(false);

  const setCurrentTabKey = (requestedTab: string) => {
    router.query.tab = requestedTab === '2' ? 'overdue' : 'general';
    router.push(router);
  };

  const updateProgressStatus =
    (taskStatus: number, factor: number) => (prevState: any) => {
      return {
        ...prevState,
        done: taskStatus === DONE ? prevState.done + factor : prevState.done,
        failed:
          taskStatus === FAILED ? prevState.failed + factor : prevState.failed,
        skipped:
          taskStatus === SKIPPED
            ? prevState.skipped + factor
            : prevState.skipped,
      };
    };

  // React.useEffect(() => {
  //   const fetchTasks = async () => {
  //     setLoading(true);
  //     try {
  //       const tasksResponse = await new TaskAPI().getTasksByEnrollmentId(
  //         enrollmentId as string
  //       );

  //       if (tasksResponse) {
  //         setTasks(tasksResponse.data);
  //         setProgressStatus({
  //           total: tasksResponse.total,
  //           done: tasksResponse.done,
  //           failed: tasksResponse.failed,
  //           skipped: tasksResponse.skipped,
  //         });
  //       }
  //       setLoading(false);
  //     } catch (exception) {
  //       console.error(exception);
  //       message.error('Oops! Something went wrong!!!');
  //       setLoading(false);
  //     }
  //   };
  //   fetchTasks();
  // }, []);

  const onDateChangeHandler = (requested: moment.Moment | null) => {
    requested && setFilterDate(requested);
  };

  const getModifiedTasks = (
    requestedTasks: TaskObj[],
    taskId: any,
    timelineId: any,
    timelineStatus: any,
    completedAt: any
  ) => {
    return requestedTasks.map((iter) =>
      taskId === iter.id
        ? {
            ...iter,
            timeline: iter.timeline.map((iterTimelineTask) => {
              if (timelineId !== iterTimelineTask.id) {
                return iterTimelineTask;
              }

              const prevStatus = iterTimelineTask.timelineStatus;

              if (prevStatus === PENDING) {
                setProgressStatus(updateProgressStatus(timelineStatus, 1));
              }
              if (timelineStatus === PENDING) {
                setProgressStatus(updateProgressStatus(prevStatus, -1));
              }

              return {
                ...iterTimelineTask,
                completedAt,
                timelineStatus,
              };
            }),
          }
        : iter
    );
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
    try {
      setLoading(true);
      setTasks(modifiedTasks);
      setTimeout(() => {
        setLoading(false);
      }, 200);
      message.success(
        completedAt ? 'Task marked as complete!' : 'Task marked as incomplete!'
      );
      const tasks = {
        tasks: [
          {
            id: timelineId,
            completed_at: completedAt,
            status: timelineStatus,
          },
        ],
      };

      await TaskDashboardAPI.markAllDone(enrollmentId as string, tasks);
    } catch (exception) {
      const completedAt = prevStatus === PENDING ? null : moment();
      const oldTasks = getModifiedTasks(
        modifiedTasks,
        taskId,
        timelineId,
        prevStatus,
        completedAt
      );
      setTasks(oldTasks);
      console.error(exception);
      message.error('Oops! Something went wrong!!!');
    }
  };

  return (
    <div
      className={clsx({
        [styles.tabs]: true,
        [styles['tabs-not-today']]:
          !filterDate.isSame(moment(), 'day') && currentTabKey === '1',
      })}
    >
      <Spin spinning={loading}>
        <Tabs
          activeKey={currentTabKey as any}
          onTabClick={(requestedkey: string) => {
            if (requestedkey === '1') {
              setFilterDate(moment());
            }
            setCurrentTabKey(requestedkey);
          }}
          tabBarExtraContent={
            currentTabKey === '1' ? (
              <div className={styles['date-container']}>
                <DatePicker
                  inputReadOnly={true}
                  value={filterDate}
                  onChange={onDateChangeHandler}
                  allowClear={false}
                  format="DD MMMM YYYY"
                />
              </div>
            ) : null
          }
        >
          <Tabs.TabPane tab="Today" key="1">
            <div className={styles['container']}>
              <PracticeTasksList
                tasks={filterTaskByDate(
                  tasks,
                  filterDate ? filterDate : moment()
                )}
                filterDate={filterDate}
                onTaskAction={onTaskAction}
                loading={loading as boolean}
              />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Overdue" key="2">
            <PracticeOverdue
              tasks={tasks}
              onTaskAction={onTaskAction}
              loading={loading as boolean}
            />
          </Tabs.TabPane>
        </Tabs>
      </Spin>
    </div>
  );
};

export default PracticeContent;
