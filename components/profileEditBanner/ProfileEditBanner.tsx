import { faPen, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dropdown, Menu, message, Modal } from 'antd';
import { Divider } from 'rc-menu';
import React from 'react';
import ProfileAPI from '../../api/profile/request';
import styles from './ProfileEditBanner.module.scss';

interface ProfileEditBannerProps {
  setCover: (request: string) => void;
}

const ProfileEditBanner: React.FC<ProfileEditBannerProps> = (
  props: ProfileEditBannerProps
) => {
  const { setCover } = props;
  const inputRef = React.useRef<any>();

  const openFile = () => {
    inputRef?.current?.click();
  };

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files) {
      if (event.target.files[0]) {
        try {
          const url = await new ProfileAPI().uploadCoverFile(
            event.target.files[0]
          );
          setCover(url || '');
          message.success('Saved');
        } catch (exception) {
          message.error('Failed');
          console.error(exception);
        }
      }
    }
  };

  const removeCover = () => {
    Modal.confirm({
      title: 'Do you want to remove your current cover pic?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => {
        try {
          setCover('');
          message.success('Removed successfully');
        } catch (exception) {
          message.error('Failed');
          console.error(exception);
        }
      },
    });
  };

  return (
    <div>
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item className={styles.item} onClick={openFile}>
              <FontAwesomeIcon icon={faUpload} />
              Upload Photo
            </Menu.Item>
            <Divider />
            <Menu.Item className={styles.item} onClick={removeCover}>
              <FontAwesomeIcon icon={faTrash} />
              Remove Cover
            </Menu.Item>
          </Menu>
        }
        overlayClassName={styles.panel}
        trigger={['click']}
        placement="bottomRight"
      >
        <Button className={styles.btn}>
          <FontAwesomeIcon icon={faPen} /> Edit Cover Photo
        </Button>
      </Dropdown>
      <input
        type="file"
        className={styles.input}
        ref={inputRef}
        accept="image/*"
        onChange={onFileChange}
      />
    </div>
  );
};

export default ProfileEditBanner;
