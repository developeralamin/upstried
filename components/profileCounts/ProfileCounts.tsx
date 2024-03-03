import React from 'react';
import { pluralize } from '../../services/util';
import styles from './ProfileCounts.module.scss';

export interface ProfileCountsProps {
  tips: number;
  thumbsUp: number;
  followers: number;
  views: number;
  isAuthor?: boolean;
}

const ProfileCounts: React.FC<ProfileCountsProps> = (
  props: ProfileCountsProps
) => {
  const { tips, thumbsUp, followers } = props;
  return (
    <div
      className={`${styles.ProfileCounts} ${
        props.isAuthor ? styles.AuthorCounts : ''
      }`}
    >
      <div>
        <span className={styles.MetaKey}>{tips}</span>
        <span className={styles.MetaValue}>Books</span>
      </div>
      <div>
        <span className={styles.MetaKey}>{thumbsUp}</span>
        <span className={styles.MetaValue}>{pluralize('Likes', thumbsUp)}</span>
      </div>
      <div>
        <span className={styles.MetaKey}>{followers}</span>
        <span className={styles.MetaValue}>
          {pluralize('Followers', followers)}
        </span>
      </div>
    </div>
  );
};

export default ProfileCounts;
