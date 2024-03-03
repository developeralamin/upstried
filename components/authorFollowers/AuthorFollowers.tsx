import React from 'react';
import AuthorsFollowersList from '../authorsFollowersList/AuthorsFollowersList';
import styles from './AuthorFollowers.module.scss';

export interface AuthorFollowersProps {
  username: string;
}

const AuthorFollowers: React.SFC<AuthorFollowersProps> = (props) => {
  return (
    <div className={styles.AuthorFollowers}>
      <AuthorsFollowersList username={props.username} type="authorFollowers" />
    </div>
  );
};

export default AuthorFollowers;
