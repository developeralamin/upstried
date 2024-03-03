import Head from 'next/head';
import React from 'react';
import DashboardLayout from '../hoc/layout/DashboardLayout';
import { isAuthenticated } from '../services/authentication';
import { HOME_ROUTE } from '../config/endpoints';
import TaskDashboardLayout from '../components/taskDashboardContent/taskDashboardLayout/TaskDashboardLayout';

const TaskDashboard = () => {
  React.useEffect(() => {
    if (!isAuthenticated()) window.location.href = HOME_ROUTE;
  });

  return (
    <DashboardLayout>
      <Head>
        <title>Task Dashboard | UpStride</title>
      </Head>
      {!isAuthenticated() ? null : <TaskDashboardLayout />}
    </DashboardLayout>
  );
};

export default TaskDashboard;
