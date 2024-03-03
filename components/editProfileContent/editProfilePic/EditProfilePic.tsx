import { Avatar, Button, message, Modal } from 'antd';
import React from 'react';
import { ProfileObj } from '../../../api/profile/dataTypes';
import ProfileAPI from '../../../api/profile/request';
import styles from './EditProfilePic.module.scss';

interface EditProfilePicProps {
  avatar: string;
  profile: ProfileObj;
  setAvatar: (requested: string) => void;
}

const EditProfilePic: React.FC<EditProfilePicProps> = (
  props: EditProfilePicProps
) => {
  const { profile, avatar, setAvatar } = props;
  const inputRef = React.useRef<any>();
  const openFile = () => {
    inputRef?.current?.click();
  };

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files) {
      if (event.target.files[0]) {
        try {
          const url = await new ProfileAPI().changeAvatar(
            event.target.files[0]
          );
          setAvatar(url || '');
          message.success('Saved');
          window.location.reload();
        } catch (exception) {
          message.error('Failed');
          console.error(exception);
        }
      }
    }
  };

  const removeAvatar = () => {
    Modal.confirm({
      title: 'Do you want to remove your current profile pic?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => {
        try {
          new ProfileAPI().removeAvatar();
          setAvatar('');
          message.success('Removed successfully');
          window.location.reload();
        } catch (exception) {
          message.error('Failed');
          console.error(exception);
        }
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.pic}>
        <Avatar src={avatar === '' ? null : avatar} size={100}>
          <div>{profile.name?.substring(0, 2)}</div>
        </Avatar>
        <input
          type="file"
          className={styles.input}
          ref={inputRef}
          accept="image/*"
          onChange={onFileChange}
        />
        <Button
          type="text"
          size="small"
          className={styles.change}
          onClick={openFile}
        >
          Change
        </Button>
        <Button
          type="text"
          size="small"
          className={styles.remove}
          onClick={removeAvatar}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default EditProfilePic;
