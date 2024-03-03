/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import styles from './Dashboard.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';

const Dashboard = () => {
  const router = useRouter();
  const activePage = router.pathname === '/task-dashboard';
  return (
    <Link href="/task-dashboard">
      <a
        className={clsx({
          [styles.Dashboard]: true,
          [styles.Active]: activePage,
        })}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.75 8.91667C0.75 9.46895 1.19772 9.91667 1.75 9.91667H7.08333C7.63562 9.91667 8.08333 9.46895 8.08333 8.91667V1.75C8.08333 1.19772 7.63562 0.75 7.08333 0.75H1.75C1.19772 0.75 0.75 1.19772 0.75 1.75V8.91667ZM0.75 16.25C0.75 16.8023 1.19772 17.25 1.75 17.25H7.08333C7.63562 17.25 8.08333 16.8023 8.08333 16.25V12.75C8.08333 12.1977 7.63562 11.75 7.08333 11.75H1.75C1.19772 11.75 0.75 12.1977 0.75 12.75V16.25ZM9.91667 16.25C9.91667 16.8023 10.3644 17.25 10.9167 17.25H16.25C16.8023 17.25 17.25 16.8023 17.25 16.25V9.08333C17.25 8.53105 16.8023 8.08333 16.25 8.08333H10.9167C10.3644 8.08333 9.91667 8.53105 9.91667 9.08333V16.25ZM10.9167 0.75C10.3644 0.75 9.91667 1.19772 9.91667 1.75V5.25C9.91667 5.80228 10.3644 6.25 10.9167 6.25H16.25C16.8023 6.25 17.25 5.80228 17.25 5.25V1.75C17.25 1.19772 16.8023 0.75 16.25 0.75H10.9167Z"
            fill="white"
          />
        </svg>
      </a>
    </Link>
  );
};

export default Dashboard;
