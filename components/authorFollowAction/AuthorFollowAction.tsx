import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, message } from 'antd';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import ServerAuthorsAPI from '../../api/authors/request';
import styles from './AuthorFollowAction.module.scss';
import eventHandler from '../../services/analytics';
// import { getUser } from '../../services/cookieHandler';
import { getAuthUser } from '../../services/authentication';
export interface AuthorFollowActionsProps {
  author: any;
  onUpdate: any;
}

const AuthorFollowActions: React.SFC<AuthorFollowActionsProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const [btnLabel, setBtnLabel] = useState('Follow');
  const followAuthor = async () => {
    setLoading(true);
    const author = { ...props.author };
    author['followers'] = author.followers + 1;
    author['isFollowing'] = true;
    props.onUpdate({ ...author });
    setBtnLabel('Following');
    setTimeout(() => {
      setLoading(false);
    }, 300);
    const response = await ServerAuthorsAPI.follow({
      username: props.author.username,
    });
    if (response && response.status !== 200) {
      message.error('Something went wrong, please try again');
      props.onUpdate({ ...props.author });
      setBtnLabel('Follow');
    }
    
  };
  useEffect(() => {
    setBtnLabel(props.author.isFollowing ? 'Following' : 'Follow');
  }, []);
  const unfollowAuthor = async () => {
    setLoading(true);
    const author = { ...props.author };
    author['followers'] = author.followers - 1;
    author['isFollowing'] = false;
    props.onUpdate({ ...author });
    setBtnLabel('Follow');
    setTimeout(() => {
      setLoading(false);
    }, 300);
    const response = await ServerAuthorsAPI.unFollow({
      username: props.author.username,
    });
    if (response?.status !== 200) {
      const author = { ...props.author };
      author['followers'] = author.followers + 1;
      author['isFollowing'] = true;
      props.onUpdate({ ...author });
      setBtnLabel('Unfollow');
    }
  };
  const onMouseEnter = () => {
    return setBtnLabel((prevState: any) =>
      prevState === 'Following' ? 'Unfollow' : prevState
    );
  };

  const onMouseOut = () => {
    return setBtnLabel((prevState: any) =>
      prevState === 'Unfollow' ? 'Following' : prevState
    );
  };

  return (
    <div className={styles.AuthorFollowActions}>
      <Button
        loading={loading}
        onClick={props.author.isFollowing ? unfollowAuthor : followAuthor}
        className={styles.BtnFollow + ' Btn' + btnLabel}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseOut}
      >
        {btnLabel === 'Unfollow' || btnLabel === 'Following' ? (
          <FontAwesomeIcon
            icon={btnLabel === 'Following' ? faCheck : faTimes}
          />
        ) : null}
        {btnLabel}
      </Button>
    </div>
  );
};

export default AuthorFollowActions;
