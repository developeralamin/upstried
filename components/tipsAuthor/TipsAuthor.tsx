/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { Dropdown } from 'antd';
import clsx from 'clsx';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import {
  TipsAuthorBaseInterface,
  TipsAuthorInterface,
} from '../../interfaces/tips.interface';
import { pluralize, strlen } from '../../services/util';
import AuthorFollowAction from '../authorFollowAction/AuthorFollowAction';
import styles from './TipsAuthor.module.scss';
export interface TipsAuthorProps {
  author: TipsAuthorBaseInterface | TipsAuthorInterface;
  modalPosition?: string;
  tipsDetailsAuthor?: boolean;
}

const TipsAuthor: React.FC<TipsAuthorProps> = (props) => {
  const { tipsDetailsAuthor } = props;
  const [author, setAuthor] = useState({ ...props.author });
  const router = useRouter();
  useEffect(() => {
    setAuthor({ ...props.author });
  }, [props.author]);
  const onAuthorFollowUpdate = (author: any) => {
    setAuthor(author);
  };
  const goToDetails = () => {
    router.pathname === '/authors/[username]'
      ? (window.location.href = `/authors/${author.username}`)
      : router.push(`/authors/${author.username}`);
  };

  const menu = (
    <div
      className={clsx(styles.Content, 'author-modal-content', styles.Active)}
      style={tipsDetailsAuthor ? { bottom: '-218px', left: '-1px' } : {}}
    >
      <div className={styles.Top}>
        <div onClick={goToDetails} className={styles.TopLeft}>
          <Image
            src={author.avatar}
            alt={author.name}
            width={57}
            height={57}
            layout="responsive"
          />
        </div>
        <div className={styles.TopMiddle}>
          <div onClick={goToDetails}>
            <h6 className={styles.Name}>{strlen(author.name, 32)}</h6>
          </div>
          {author.profession ? (
            <p className={styles.Profession}>
              {strlen(author.profession, 32) ?? ''}
            </p>
          ) : null}
        </div>
        <div className={styles.TopRight}>
          <AuthorFollowAction author={author} onUpdate={onAuthorFollowUpdate} />
        </div>
      </div>
      <div className={styles.Middle}>
        {author.quote ? (
          <p className={styles.Desc}>{strlen(author.quote, 68) ?? ''}</p>
        ) : null}
        {author.address ? (
          <p className={styles.City}>{author.address}</p>
        ) : null}
      </div>
      <div className={styles.Bottom}>
        <div className={styles.BottomItem}>
          <span className={styles.Key}>{author.counts.tips}</span>
          <span className={styles.Val}>Books</span>
        </div>
        <div className={styles.BottomItem}>
          <span className={styles.Key}>{author.counts.thumbsUp}</span>
          <span className={styles.Val}>
            {pluralize('Likes', author.counts.thumbsUp)}
          </span>
        </div>
        <div className={styles.BottomItem}>
          <span className={styles.Key}>{author.counts.followers}</span>
          <span className={styles.Val}>
            {pluralize('Followers', author.counts.followers)}
          </span>
        </div>
      </div>
    </div>
  );
  return (
    <div className={styles.TipsAuthor}>
      <Dropdown overlay={menu} placement="topCenter">
        <div onClick={goToDetails}>
          <div className={styles.Author}>
            <div data-testid="tips-author" className={styles.AuthorName}>
              <span>by</span>
              <span className={styles.Name + ' tips-author-name'}>
                {' '}
                {author.name}
              </span>
            </div>
          </div>
        </div>
      </Dropdown>
    </div>
  );
};

export default TipsAuthor;
