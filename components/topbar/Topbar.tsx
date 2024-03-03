import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React, { useLayoutEffect, useState } from 'react';
import AccountAPI from '../../api/accounts/request';
import { AuthorObj } from '../../api/authors/dataTypes';
import { ADMIN } from '../../config/constants';
import { HOME_ROUTE } from '../../config/endpoints';
import { isAuthenticated } from '../../services/authentication';
import Dashboard from '../navItemDashboard/Dashboard';
import Notifications from '../notifications/Notifications';
import ProfileNav from '../profileNav/ProfileNav';
import SearchBox from '../searchBox/SearchBox';
import TipsCreate from '../tipsCreate/TipsCreate';
import styles from './Topbar.module.scss';
import TopbarLoader from './TopbarLoader';

interface TopbarProps {
  position?: string;
  profile: AuthorObj;
}
const Topbar = (props: TopbarProps) => {
  const { position, profile } = props;
  const [pageLoading, setPageLoading] = useState(true);
  const [toggleSearch, setToggleSearch] = useState(false);

  useLayoutEffect(() => {
    setTimeout(() => {
      setPageLoading(false);
    }, 500);
  }, []);
  const toggleMobileSearch = () => {
    setToggleSearch(!toggleSearch);
  };
  const style =
    position === 'fixed'
      ? ({
          position: 'fixed',
          width: '100%',
          zIndex: 99,
          top: 0,
        } as React.CSSProperties)
      : ({} as React.CSSProperties);
  return (
    <div id="header" style={style} className={styles.Topbar + ' topbar'}>
      {!pageLoading ? (
        <div className="container">
          <div className={styles.Wrapper}>
            <div className={styles.Start}>
              <div className={styles.Brand}>
                <Link href={HOME_ROUTE}>
                  <a>
                    <Image
                      src="/upstride-logo.svg"
                      alt="UpStride"
                      width="110"
                      height="50"
                    />
                  </a>
                </Link>
              </div>
              <div className={styles.BrandMini}>
                <a href={HOME_ROUTE}>
                  <img src="/logo-mini.png" alt="Virtunus" />
                </a>
              </div>
            </div>
            <div className={styles.SearchBox}>
              <Button
                onClick={toggleMobileSearch}
                className={styles.SearchMobileToggler}
              >
                <FontAwesomeIcon icon={faSearch} />
              </Button>
              <div
                className={
                  styles.SearchBoxContainer +
                  (toggleSearch ? ' ' + styles.SearchBoxContainerActive : '')
                }
              >
                <SearchBox />
                <Button
                  onClick={toggleMobileSearch}
                  className={styles.SearchMobileCloser}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </Button>
              </div>
            </div>
            <div className={styles.RightWrapper}>
              {!isAuthenticated() ? (
                <Button
                  onClick={() => AccountAPI.goToLogin()}
                  className={styles.LoginBtn + ' theme-btn Btn--one'}
                >
                  Log in
                </Button>
              ) : (
                <>
                  {profile?.username === ADMIN && <TipsCreate />}
                  <Dashboard />
                  <Notifications profile={profile} />
                  <ProfileNav profile={profile} />
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <TopbarLoader />
      )}
    </div>
  );
};
export default Topbar;
