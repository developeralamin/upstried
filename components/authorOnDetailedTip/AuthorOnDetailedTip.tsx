import lodash from 'lodash';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { TipsAuthorDataType } from '../../api/books/dataTypes';
import TipsAPI from '../../api/books/request';
import TipsListItem from '../tipsListItem/TipsListItem';
import styles from './AuthorOnDetailedTip.module.scss';

export interface AuthorOnDetailedTipProps {
  author: TipsAuthorDataType;
  tipsSlug: string;
}

const AuthorOnDetailedTip: React.FC<AuthorOnDetailedTipProps> = (props) => {
  const [tips, setTips] = useState<any>([]);
  const fetchAuthorTips = async () => {
    const response = await TipsAPI.all({
      author: props.author.username,
    });
    if (response.status === 200 && response.data) {
      const responseData = response.data.filter(
        (item: any) => item.slug !== props.tipsSlug
      );
      const result = lodash.take(responseData, 3);
      setTips(result);
    }
  };
  useEffect(() => {
    if (props.tipsSlug) {
      fetchAuthorTips();
    }
  }, []);
  const goAuthorDetails = () => {
    router.push(`/authors/${props.author.username}`);
  };
  return (
    <div className={styles.AuthorOnDetailedTip}>
      <div className={styles.Author}>
        <figure className={styles.AuthorPhoto}>
          <img
            src={props.author.avatar}
            width="100"
            height="100"
            alt="avatar"
          />
        </figure>
        <div onClick={goAuthorDetails} className={styles.Name}>
          {props.author.name}
        </div>
        <span className={styles.Title}>{props.author.profession}</span>
      </div>
      <div className={styles.Container}>
        <div className={styles.TipsList + ' TipsList'}>
          {tips.map((tip: any, index: number) => (
            <TipsListItem previewOnly key={index} tips={tip} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorOnDetailedTip;
