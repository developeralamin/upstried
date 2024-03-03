import React from 'react';
import AuthorsFollowingList from '../authorsFollowingList/AuthorsFollowingList';
import styles from './AuthorFollowings.module.scss';

export interface AuthorFollowingsProps {
  username: string;
}

const AuthorFollowings: React.FC<AuthorFollowingsProps> = (props) => {
  return (
    <div className={styles.AuthorFollowings}>
      <AuthorsFollowingList username={props.username} type="authorFollowing" />
    </div>
  );
};

export default AuthorFollowings;
