import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, message, Modal as ConfirmModal } from 'antd';
import React, { useEffect, useState } from 'react';
import ServerAuthorsAPI from '../../api/authors/request';
import styles from './BlockAuthorList.module.scss';
import { Divider } from 'antd';

export interface BlockAuthorListProps {
  profile: any;
}
const { confirm } = ConfirmModal;

const BlockAuthorList: React.FC<BlockAuthorListProps> = (props) => {
  const [blockedAuthors, setBlockedAuthors] = useState<any>([]);
  useEffect(() => {
    getBlockList();
  }, []);
  const getBlockList = async () => {
    const response = await ServerAuthorsAPI.getBlockList({
      username: props.profile.username,
    });
    if (response && response.status === 200) {
      setBlockedAuthors(response.data.data);
    }
  };
  const unblockAuthor = async (username: string) => {
    confirm({
      title: 'Are you sure to unblocked this author',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      closable: true,
      className: 'tips-leave-modal',
      onOk() {
        ServerAuthorsAPI.unblock({
          username: username,
        }).then((response) => {
          if (response && response.status === 200) {
            message.success('Author unblocked successfully');
            setBlockedAuthors((prevState: any) => {
              const authors = prevState.filter(
                (prevAuthor: any) => prevAuthor.username !== username
              );
              return authors;
            });
          }
        });
      },
    });
  };
  return (
    <div className={styles.BlockAuthorList}>
      <h4 className={styles.Heading}>Blocked People</h4>
      <Divider className={styles.divider} />
      <ul className={styles.BlockedAuthorList}>
        {blockedAuthors.map((author: any, index: number) => (
          <li key={index} className={styles.BlockedAuthorItem}>
            <FontAwesomeIcon className={styles.Circle} icon={faCircle} />
            <span>{author.name}</span>{' '}
            <Button
              onClick={() => unblockAuthor(author.username)}
              className={styles.Unblock}
            >
              Unblock
            </Button>{' '}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlockAuthorList;
