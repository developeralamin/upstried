import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'antd';
import React from 'react';
import TipCommentsList from '../tipsCommentsList/TipsCommentsList';
import styles from './TipComments.module.scss';
export interface TipsCommtentsProps {
  onToggleWindow: any;
  tipsSlug: string;
  comments: any;
  onCommentCreated?: any;
  totalComments: number;
  onTipActionToggle: any;
  onCommentDeleted: any;
}

const TipsCommtents: React.SFC<TipsCommtentsProps> = (props) => {
  return (
    <div className={styles.TipComments}>
      <Button
        className={styles.Toggler + ' CommentCloser'}
        onClick={() => props.onTipActionToggle()}
      >
        <FontAwesomeIcon icon={faTimes} />
      </Button>
      <div className={styles.Top}></div>
      <TipCommentsList
        onCommentDeleted={props.onCommentDeleted}
        onToggleWindow={props.onToggleWindow}
        onCommentCreated={props.onCommentCreated}
        tipsSlug={props.tipsSlug}
        comments={props.comments}
        totalComments={props.totalComments}
      />
    </div>
  );
};

export default TipsCommtents;
