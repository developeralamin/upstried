import React from 'react';
import TaskDashboardCalendar from '../components/taskDashboardCalendar/TaskDashboardCalendar';

function TmpTaskDashboard() {
  return (
    <div style={{ width: 60 + '%', margin: 'auto', marginTop: '30px' }}>
      <TaskDashboardCalendar
        onSelect={(date: moment.Moment) => console.log(date)}
        status="overdue"
      />
    </div>
  );
}

export default TmpTaskDashboard;
