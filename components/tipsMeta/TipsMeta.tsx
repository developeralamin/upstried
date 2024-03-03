import router from 'next/router';
import React from 'react';
import { strlen } from '../../services/util';
import TipsAuthor from '../tipsAuthor/TipsAuthor';
import styles from './TipsMeta.module.scss';
import { TipsMetaProps } from './TipsMeta.d';
import { Tooltip } from 'antd';
import { upperFirst } from 'lodash';

export default function TipsMeta(props: TipsMetaProps) {
  const {
    author,
    category,
    publishedAt,
    categoryUrl,
    updatedAt,
    privacyActive,
    tipsPrivacy,
    tipsDetailsAuthor,
  } = props;
  return (
    <div className={styles.TipsMeta}>
      <TipsAuthor author={author} tipsDetailsAuthor={tipsDetailsAuthor} />
      {category && (
        <div
          className={styles.MetaItem}
          onClick={() => router.push({ pathname: categoryUrl })}
          data-testid="tips-category"
        >
          <span data-testid="TipsMeta_Category">
            Category: {strlen(category, 20, '..')}
          </span>
        </div>
      )}
      {publishedAt && (
        <div data-testid="tips-date" className={styles.MetaItem}>
          <span className={styles.Divider}></span>
          <span className={styles.PublishedAt}>Published: {publishedAt}</span>
        </div>
      )}
      {updatedAt && (
        <div data-testid="tips-date" className={styles.MetaItem}>
          <span className={styles.DividerBar}>|</span>
          <span className={styles.PublishedAt}>Updated: {updatedAt}</span>
        </div>
      )}
      {privacyActive && (
        <div className={styles.PrivacyIcon}>
          {' '}
          <span className={styles.Divider}></span>
          <span className={styles.Privacy}>
            <Tooltip title={upperFirst(tipsPrivacy)}>
              <img
                src={`/tips/privacy-${tipsPrivacy}-ico.svg`}
                width={17}
                height={17}
                alt="icon"
              />
            </Tooltip>
          </span>
        </div>
      )}
    </div>
  );
}
