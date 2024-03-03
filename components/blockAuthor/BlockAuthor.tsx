import { Button, message, Modal } from 'antd';
import router from 'next/router';
import React, { useState } from 'react';
import ServerAuthorsAPI from '../../api/authors/request';
import styles from './BlockAuthor.module.scss';

export interface BlockAuthorProps {
  author: any;
}

const BlockAuthor: React.FC<BlockAuthorProps> = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const blockAuthor = async () => {
    const response = await ServerAuthorsAPI.block({
      username: props.author.username,
    });
    if (response.status === 200) {
      setIsModalVisible(false);
      router.push('/');
      message.success(response.message);
    } else {
      message.error(response.message);
      setIsModalVisible(false);
    }
  };
  return (
    <div className={styles.BlockAuthor}>
      <Button type="primary" onClick={showModal} className={styles.OpenModal}>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.00033 1.16699C3.78033 1.16699 1.16699 3.78033 1.16699 7.00033C1.16699 10.2203 3.78033 12.8337 7.00033 12.8337C10.2203 12.8337 12.8337 10.2203 12.8337 7.00033C12.8337 3.78033 10.2203 1.16699 7.00033 1.16699ZM2.33366 7.00033C2.33366 4.42199 4.42199 2.33366 7.00033 2.33366C8.07949 2.33366 9.07116 2.70116 9.85866 3.31949L3.31949 9.85866C2.67886 9.04382 2.33155 8.03684 2.33366 7.00033ZM7.00033 11.667C5.92116 11.667 4.92949 11.2995 4.14199 10.6812L10.6812 4.14199C11.3218 4.95683 11.6691 5.96381 11.667 7.00033C11.667 9.57866 9.57866 11.667 7.00033 11.667Z"
            fill="currentColor"
          />
        </svg>
        <span>Block</span>
      </Button>
      <Modal
        title="Block!"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
        className="modal-block-author"
      >
        <p className="modal-block-author__text">
          Are you sure you want to block{' '}
          <span className="author-name">{props.author.name}</span>? Once you
          block
        </p>
        <ul>
          <li>
            You won’t be able to check{' '}
            <span className="author-name">{props.author.name}</span>’s tips
          </li>
          <li>
            You won’t be able to enroll{' '}
            <span className="author-name">{props.author.name}</span>’s tips
          </li>
          <li>
            You won’t be able to provide feedback on{' '}
            <span className="author-name">{props.author.name}</span>’s tips
          </li>
        </ul>
        <div className="modal-block-author__footer">
          <Button
            className="modal-block-author__btn--primary"
            type="primary"
            onClick={blockAuthor}
          >
            Block
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default BlockAuthor;
