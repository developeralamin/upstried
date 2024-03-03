import { Avatar } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { pluralize, strlen } from '../../services/util';
import AuthorFollowActions from '../authorFollowAction/AuthorFollowAction';
import styles from './AuthorsListItem.module.scss';
export interface AuthorsListItemProps {
  author: any;
}

const AuthorsListItem: React.SFC<AuthorsListItemProps> = (props) => {
  const [author, setAuthor] = useState({ ...props.author });
  const router = useRouter();

  const goToDetails = () => {
    router.pathname === '/authors/[username]'
      ? (window.location.href = `/authors/${props.author.username}`)
      : router.push(`/authors/${props.author.username}`);
  };

  const onUpdateHandler = (updatedAuthor: any) => {
    setAuthor(updatedAuthor);
  };
  const strToHsColor = (str: string) => {
    const colors = [
      '#e51c23',
      '#e91e63',
      '#9c27b0',
      '#673ab7',
      '#3f51b5',
      '#5677fc',
      '#03a9f4',
      '#00bcd4',
      '#009688',
      '#259b24',
      '#8bc34a',
      '#afb42b',
      '#ff9800',
      '#ff5722',
      '#795548',
      '#607d8b',
    ];

    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash;
    }
    hash = ((hash % colors.length) + colors.length) % colors.length;
    return colors[hash];
  };
  return (
    <div className={styles.AuthorsListItem}>
      <a href={`/authors/${props.author.username}`}>
        <div className={styles.Top}>
          <div className={styles.Thumbnail}>
            <Avatar
              style={{ backgroundColor: strToHsColor(author.name[0]) }}
              size={80}
              src={author.avatar}
              className={styles.Avatar}
            >
              <span className={styles.AvatarTxt}>{author.name[0]}</span>
            </Avatar>
          </div>
          <div onClick={goToDetails}>
            <h3 className={styles.Name}>{strlen(author.name, 32)}</h3>
          </div>
          <span className={styles.Profession}>
            {strlen(author.profession, 32)}
          </span>
        </div>

        <div className={styles.Content}>
          <div className={styles.AuthorMeta}>
            <div className={styles.AuthorMetaItem}>
              <span className={styles.Key}>{author.followers}</span>
              <span className={styles.Val}>
                {pluralize('Followers', author.followers)}
              </span>
            </div>
            <div className={styles.AuthorMetaItem}>
              <span className={styles.Divider}>|</span>
            </div>
            <div className={styles.AuthorMetaItem}>
              <span className={styles.Key}>{author.ownTips}</span>
              <span className={styles.Val}>Tips</span>
            </div>
          </div>
          <div className={styles.FollowActionsContainer}>
            <AuthorFollowActions author={author} onUpdate={onUpdateHandler} />
          </div>
        </div>
      </a>
    </div>
  );
};

export default AuthorsListItem;
