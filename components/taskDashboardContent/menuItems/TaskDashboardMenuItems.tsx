import { faSleigh } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import styles from './TaskDashBoardMenuITems.module.scss';

const Title = (
  <div className={styles.Title}>
    <div className={styles.TitleText}>TASK DASHBOARD</div>
  </div>
);
// styles.MenuButton + ' ' + styles.Active

const TodayItem = (props: any) => {
  const { timelineTask, setTimelineTask, hoverItem, setHoveredItem } = props;
  return (
    <button
      className={clsx({
        [styles.MenuButton]: true,
        [styles.Active]: timelineTask == '1' ? true : false,
      })}
      onClick={() => {
        setTimelineTask('1');
      }}
      onMouseEnter={() => {
        setHoveredItem('1');
      }}
      onMouseLeave={() => {
        setHoveredItem('');
      }}
    >
      <svg
        width="25"
        height="25"
        viewBox="0 0 18 18"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className={clsx({
          [styles.IconInactive]: timelineTask !== '1' ? true : false,
          // [styles.OnHover]: hoverItem === '1' ? true : false,
        })}
      >
        <path
          d="M15 2.25H14.25V0.75H12.75V2.25H5.25V0.75H3.75V2.25H3C2.175 2.25 1.5 2.925 1.5 3.75V15.75C1.5 16.575 2.175 17.25 3 17.25H15C15.825 17.25 16.5 16.575 16.5 15.75V3.75C16.5 2.925 15.825 2.25 15 2.25ZM15 15.75H3V7.5H15V15.75ZM15 6H3V3.75H15V6Z"
          fill={hoverItem === '1' ? '#88A6FF' : 'currentColor'}
        />
        <rect
          x="5"
          y="9"
          width="3"
          height="3"
          rx="0.5"
          fill={hoverItem === '1' ? '#88A6FF' : 'currentColor'}
        />
      </svg>

      <div>Today</div>
    </button>
  );
};

const UpcomingItem = (props: any) => {
  const { timelineTask, setTimelineTask, hoverItem, setHoveredItem } = props;
  return (
    <button
      className={clsx({
        [styles.MenuButton]: true,
        [styles.Active]: timelineTask === '2' ? true : false,
      })}
      onClick={() => {
        setTimelineTask('2');
      }}
      onMouseEnter={() => {
        setHoveredItem('2');
      }}
      onMouseLeave={() => {
        setHoveredItem('');
      }}
    >
      <svg
        width="25"
        height="25"
        viewBox="0 0 16 18"
        fill={hoverItem === '2' ? '#88A6FF' : 'currentColor'}
        xmlns="http://www.w3.org/2000/svg"
        className={clsx({
          [styles.IconInactive]: timelineTask !== '2' ? true : false,
          [styles.OnHover]: hoverItem === '2' ? true : false,
        })}
      >
        <path
          d="M14 2.25H13.25V0.75H11.75V2.25H4.25V0.75H2.75V2.25H2C1.175 2.25 0.5 2.925 0.5 3.75V15.75C0.5 16.575 1.175 17.25 2 17.25H14C14.825 17.25 15.5 16.575 15.5 15.75V3.75C15.5 2.925 14.825 2.25 14 2.25ZM14 15.75H2V7.5H14V15.75ZM14 6H2V3.75H14V6Z"
          fill="currentColor"
        />
      </svg>
      <div>Upcoming</div>
    </button>
  );
};

const OverdueItem = (props: any) => {
  const { timelineTask, setTimelineTask, hoverItem, setHoveredItem } = props;
  return (
    <button
      className={clsx({
        [styles.MenuButton]: true,
        [styles.Active]: timelineTask === '3' ? true : false,
      })}
      onClick={() => {
        setTimelineTask('3');
      }}
      onMouseEnter={() => {
        setHoveredItem('3');
      }}
      onMouseLeave={() => {
        setHoveredItem('');
      }}
    >
      <svg
        width="25"
        height="25"
        viewBox="0 0 18 18"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className={clsx({
          [styles.IconInactive]: timelineTask !== '3' ? true : false,
          // [styles.OnHover]: hoverItem === '2' ? true : false,
        })}
      >
        <path
          d="M15 2.25H14.25V0.75H12.75V2.25H5.25V0.75H3.75V2.25H3C2.175 2.25 1.5 2.925 1.5 3.75V15.75C1.5 16.575 2.175 17.25 3 17.25H15C15.825 17.25 16.5 16.575 16.5 15.75V3.75C16.5 2.925 15.825 2.25 15 2.25ZM15 15.75H3V7.5H15V15.75ZM15 6H3V3.75H15V6Z"
          fill={hoverItem === '3' ? '#88A6FF' : 'currentColor'}
        />
        <path
          d="M10.5982 9.03253C10.7704 8.86037 11.0487 8.86037 11.2209 9.03253C11.3896 9.20128 11.3896 9.48302 11.2209 9.65177L9.62265 11.25L11.2209 12.8482C11.393 13.0204 11.393 13.2987 11.2209 13.4709C11.0487 13.643 10.7704 13.643 10.5982 13.4709L9 11.8726L7.40177 13.4709C7.22961 13.643 6.95128 13.643 6.77912 13.4709C6.60696 13.2987 6.60696 13.0204 6.77912 12.8482L8.37735 11.25L6.77912 9.65177C6.60696 9.47961 6.60696 9.20128 6.77912 9.02912C6.95128 8.85696 7.22961 8.85696 7.40177 9.02912L9.00007 10.6274L10.5982 9.03253ZM10.5982 9.03253L10.5983 9.03246L10.6689 9.10324L10.5982 9.03253Z"
          fill={hoverItem === '3' ? '#88A6FF' : 'currentColor'}
          stroke="currentColor"
          strokeWidth="0.2"
        />
      </svg>

      <div>Overdue</div>
    </button>
  );
};

export { Title, TodayItem, OverdueItem, UpcomingItem };
