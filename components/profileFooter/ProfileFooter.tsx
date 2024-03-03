/* eslint-disable jsx-a11y/anchor-is-valid */
import styles from './ProfileFooter.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { HOME_ROUTE } from '../../config/endpoints';

const ProfileFooter: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <div className={styles.footer}>
      <div className="container">
        <div className={styles.left}>
          <Link href={HOME_ROUTE}>
            <Image
              src="/virtunus-logo.svg"
              alt="Virtunus"
              width="200"
              height="50"
            />
          </Link>
          <p className={styles.text}>© {year} Virtunus. All rights reserved.</p>
        </div>
        <div>
          <p className={styles.text}>Our Social Media</p>
          <ul className={styles.socialLinkList}>
            <li className={styles.socialLinkListItem}>
              <Link href="https://www.facebook.com/Virtunus">
                <a target="_blank">
                  <Image
                    src="/icons/facebook.svg"
                    width="19"
                    height="19"
                    alt="Facebook"
                  />
                </a>
              </Link>
            </li>
            <li className={styles.socialLinkListItem}>
              <Link href="https://twitter.com/TeamVirtunus">
                <a target="_blank">
                  <Image
                    src="/icons/twitter.svg"
                    width="19"
                    height="19"
                    alt="Facebook"
                  />
                </a>
              </Link>
            </li>
            <li className={styles.socialLinkListItem}>
              <Link href="https://www.youtube.com/channel/UChVpxk1XhCXxK7HwolRyhUA">
                <a target="_blank">
                  <Image
                    src="/icons/youtube.svg"
                    width="19"
                    height="19"
                    alt="Youtube"
                  />
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileFooter;
