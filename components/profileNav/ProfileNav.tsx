import { Avatar } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import AccountsAPI from '../../api/accounts/request';
import MenuItems from '../menuItems/MenuItems';
import ProfileIntro from '../profileIntro/ProfileIntro';
import styles from './ProfileNav.module.scss';

export interface ProfileNavProps {
  profile: any;
}

const ProfileNav: React.SFC<ProfileNavProps> = (props) => {
  const [active, setActive] = useState(false);
  const profileNavRef = useRef(null) as any;

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
  }, [profileNavRef]);

  const handleClickOutside = (ev: any) => {
    if (
      profileNavRef &&
      profileNavRef.current &&
      !profileNavRef.current.contains(ev.target) &&
      !ev.target.parentElement?.classList.contains('ant-avatar')
    ) {
      setActive(false);
    }
  };
  const profileToggler = () => {
    setActive(!active);
  };

  return (
    <div className={styles.ProfileNav}>
      <div className={styles.Toggler} onClick={profileToggler}>
        <Avatar size={40} src={props.profile?.avatar}>
          {props.profile?.name[0]}
        </Avatar>
      </div>
      {active ? (
        <div className={styles.ProfileNavbar} ref={profileNavRef}>
          <img
            className={styles.UpArrow}
            src="/topbar/up-arrow.svg"
            alt="icon"
          />
          {/* Top start */}
          <ProfileIntro profile={props.profile} />
          {/* Top End */}
          <div className={styles.Divider}></div>
          {/* Middle start */}
          <div className={styles.Middle}>
            <MenuItems profile={props.profile} />
          </div>
          {/* Middle end */}
          <div className={styles.Divider}></div>
          <div className={styles.Bottom}>
            <button
              onClick={() => AccountsAPI.logout()}
              className={styles.Logout}
            >
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.0654 11.4583L8.86121 13.6529C8.77139 13.7419 8.70009 13.8479 8.65144 13.9647C8.60279 14.0815 8.57774 14.2068 8.57774 14.3333C8.57774 14.4598 8.60279 14.585 8.65144 14.7018C8.70009 14.8186 8.77139 14.9246 8.86121 15.0137C8.9503 15.1035 9.05629 15.1748 9.17307 15.2235C9.28986 15.2721 9.41512 15.2972 9.54163 15.2972C9.66814 15.2972 9.7934 15.2721 9.91018 15.2235C10.027 15.1748 10.133 15.1035 10.222 15.0137L14.0554 11.1804C14.1426 11.0892 14.211 10.9817 14.2566 10.8641C14.3525 10.6308 14.3525 10.3691 14.2566 10.1358C14.211 10.0181 14.1426 9.91066 14.0554 9.81952L10.222 5.98618C10.1327 5.89683 10.0266 5.82595 9.90987 5.77759C9.79312 5.72924 9.66799 5.70435 9.54163 5.70435C9.41526 5.70435 9.29013 5.72924 9.17339 5.77759C9.05664 5.82595 8.95056 5.89683 8.86121 5.98618C8.77186 6.07554 8.70098 6.18161 8.65262 6.29836C8.60426 6.41511 8.57937 6.54024 8.57937 6.6666C8.57937 6.79296 8.60426 6.91809 8.65262 7.03484C8.70098 7.15159 8.77186 7.25766 8.86121 7.34702L11.0654 9.5416H1.87496C1.62079 9.5416 1.37704 9.64257 1.19732 9.82229C1.01759 10.002 0.916626 10.2458 0.916626 10.4999C0.916626 10.7541 1.01759 10.9979 1.19732 11.1776C1.37704 11.3573 1.62079 11.4583 1.87496 11.4583H11.0654ZM10.5 0.916599C8.70892 0.908603 6.95149 1.40268 5.42699 2.34278C3.9025 3.28289 2.67196 4.6314 1.87496 6.23535C1.76058 6.4641 1.74177 6.72891 1.82264 6.97154C1.90352 7.21417 2.07746 7.41473 2.30621 7.5291C2.53496 7.64347 2.79977 7.66229 3.0424 7.58142C3.28502 7.50055 3.48558 7.3266 3.59996 7.09785C4.20581 5.87437 5.12738 4.83486 6.26944 4.08675C7.41151 3.33865 8.73262 2.90909 10.0963 2.84246C11.4599 2.77583 12.8166 3.07455 14.0262 3.70776C15.2357 4.34096 16.2542 5.28567 16.9765 6.44426C17.6987 7.60286 18.0985 8.9333 18.1344 10.2981C18.1704 11.6629 17.8412 13.0125 17.181 14.2075C16.5208 15.4026 15.5534 16.3996 14.3788 17.0956C13.2043 17.7916 11.8652 18.1613 10.5 18.1666C9.07097 18.1728 7.66919 17.7759 6.4555 17.0216C5.24181 16.2673 4.26538 15.1861 3.63829 13.902C3.52392 13.6733 3.32336 13.4993 3.08073 13.4184C2.83811 13.3376 2.57329 13.3564 2.34454 13.4708C2.11579 13.5851 1.94185 13.7857 1.86097 14.0283C1.7801 14.271 1.79892 14.5358 1.91329 14.7645C2.67309 16.2935 3.82758 17.5918 5.25737 18.5251C6.68715 19.4583 8.34031 19.9926 10.0458 20.0727C11.7513 20.1528 13.4473 19.7758 14.9583 18.9807C16.4692 18.1856 17.7403 17.0013 18.6401 15.5502C19.5399 14.0991 20.0356 12.434 20.0761 10.7271C20.1166 9.02014 19.7003 7.3334 18.8703 5.84131C18.0403 4.34923 16.8267 3.10598 15.3551 2.24016C13.8835 1.37434 12.2074 0.917401 10.5 0.916599Z"
                  fill="#959595"
                />
              </svg>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default ProfileNav;
