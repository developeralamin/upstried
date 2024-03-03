import React, { useState } from 'react';
import styles from './TaskDashboardLayout.module.scss';
import ContentToday from '../taskDashboardToday/TaskDashboardToday';
import ContentOverdue from '../taskDashboardOverdue/TaskDashboardOverdue';
import ContentUpcoming from '../taskDashBoardUpcoming/TaskDashboradUpcoming';
import {
  Title,
  TodayItem,
  OverdueItem,
  UpcomingItem,
} from '../menuItems/TaskDashboardMenuItems';

// const ContentUpcoming = () => <TaskDashboardUpcoming />;
// const ContentOverdue = () => <TaskDashboardOverdue />;

const TaskDashboardLayout = () => {
  const [timelineTask, setTimelineTask] = useState('1');
  const [hoverItem, setHoveredItem] = useState('');

  let ContentBody: any;
  switch (timelineTask) {
    case '1':
      ContentBody = ContentToday;
      break;
    case '2':
      ContentBody = ContentUpcoming;
      break;
    case '3':
      ContentBody = ContentOverdue;
      break;
  }

  return (
    <div className={styles.TaskDashboard}>
      <div className="container">
        <div className={styles.Sidebar}>
          {Title}
          <div className={styles.MenuItemsWrapper}>
            <ul>
              <li>
                <TodayItem
                  timelineTask={timelineTask}
                  setTimelineTask={setTimelineTask}
                  hoverItem={hoverItem}
                  setHoveredItem={setHoveredItem}
                />
              </li>
              <li>
                <UpcomingItem
                  timelineTask={timelineTask}
                  setTimelineTask={setTimelineTask}
                  hoverItem={hoverItem}
                  setHoveredItem={setHoveredItem}
                />
              </li>
              <li>
                <OverdueItem
                  timelineTask={timelineTask}
                  setTimelineTask={setTimelineTask}
                  hoverItem={hoverItem}
                  setHoveredItem={setHoveredItem}
                />
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.Content}>
          <ContentBody />
        </div>
      </div>
    </div>
  );
};

export default TaskDashboardLayout;
