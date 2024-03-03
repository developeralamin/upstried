import { Button, Form, Input, message } from 'antd';
import React from 'react';
import { ProfileObj, SocialObj } from '../../../api/profile/dataTypes';
import ProfileAPI from '../../../api/profile/request';
import styles from './SocialForm.module.scss';

interface SocialFormProps {
  profile: ProfileObj;
  onProfileChange: (requested: Partial<ProfileObj>) => void;
}

const SocialForm: React.FC<SocialFormProps> = (props: SocialFormProps) => {
  const { profile, onProfileChange } = props;

  const onSubmit = async (values: SocialObj) => {
    try {
      await new ProfileAPI().updateSocial({
        facebook:
          values.facebook && values.facebook !== ''
            ? 'https://www.facebook.com/' + values.facebook
            : '',
        linkedin:
          values.linkedin && values.linkedin !== ''
            ? 'https://www.linkedin.com/' + values.linkedin
            : '',
        twitter:
          values.twitter && values.twitter !== ''
            ? 'https://www.twitter.com/' + values.twitter
            : '',
        youtube:
          values.youtube && values.youtube !== ''
            ? 'https://www.youtube.com/' + values.youtube
            : '',
        personal:
          values.personal && values.personal !== ''
            ? 'https://' + values.youtube
            : '',
      });
      onProfileChange(values);
      message.success('Success');
    } catch (exception) {
      message.error('Failed');
      console.error('error');
    }
  };

  return (
    <div className={styles.container}>
      <Form
        initialValues={{
          facebook: profile.facebook?.replace('https://www.facebook.com/', ''),
          twitter: profile.twitter?.replace('https://www.twitter.com/', ''),
          linkedin: profile.linkedin?.replace('https://www.linkedin.com/', ''),
          youtube: profile.youtube?.replace('https://www.youtube.com/', ''),
          personal: profile.personal?.replace('https://', ''),
        }}
        onFinish={onSubmit}
      >
        <Form.Item label={<div>Facebook</div>} name="facebook">
          <Input addonBefore="https://www.facebook.com/" />
        </Form.Item>
        <Form.Item label={<div>LinkedIn</div>} name="linkedin">
          <Input addonBefore="https://www.linkedin.com/" />
        </Form.Item>
        <Form.Item label={<div>Twitter</div>} name="twitter">
          <Input addonBefore="https://www.twitter.com/" />
        </Form.Item>
        <Form.Item label="Youtube" name="youtube">
          <Input addonBefore="https://www.youtube.com/" />
        </Form.Item>
        <Form.Item label={<div>Personal Website</div>} name="personal">
          <Input addonBefore="https://" />
        </Form.Item>
        <Form.Item className={styles['btn-container']}>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SocialForm;
