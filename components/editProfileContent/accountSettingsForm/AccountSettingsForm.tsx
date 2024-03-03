import { Alert, Button, Divider, Form, Input, message, Modal } from 'antd';
import useForm from 'antd/lib/form/hooks/useForm';
import React from 'react';
import { ProfileAccountObj, ProfileObj } from '../../../api/profile/dataTypes';
import ProfileAPI from '../../../api/profile/request';
import { LOGOUT_ROUTE } from '../../../config/endpoints';
import { destroyState } from '../../../services/cookieStorageSync';
import styles from './AccountSettingsForm.module.scss';

interface AccountSettingsFormProps {
  profile: ProfileObj;
  onProfileChange: (requested: Partial<ProfileObj>) => void;
}

const AccountSettingsForm: React.FC<AccountSettingsFormProps> = (
  props: AccountSettingsFormProps
) => {
  const { profile, onProfileChange } = props;
  const [form] = useForm();
  const [modalForm] = useForm();
  const [visible, setVisible] = React.useState<boolean>(false);

  const onSubmit = async (values: ProfileAccountObj) => {
    try {
      await new ProfileAPI().modifyAccount(values);
      onProfileChange({ username: values.username, email: values.email });
      message.success('Successfully changed! Redirecting to login.');
      destroyState();
      setVisible(false);
      form.resetFields();
      window.location.href = LOGOUT_ROUTE;
    } catch (exception) {
      message.error(JSON.stringify((exception as any).response.data.errors));
      console.error('error');
    }
  };

  const requestDeactivate = () => {
    modalForm.resetFields();
    setVisible(true);
  };

  return (
    <div>
      <div className={styles['form-container']}>
        <Form
          form={form}
          initialValues={{
            email: profile.email,
            username: profile.username,
            password: '',
          }}
          onFinish={onSubmit}
        >
          <Alert
            className={styles.alert}
            showIcon
            message="Updating username/email will result logout"
            type="warning"
          />
          <Form.Item
            label={<div>Username</div>}
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<div>Email</div>}
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please provide a valid email!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item shouldUpdate className={styles.reset}>
            {() => {
              return form.getFieldValue('email') !== profile.email ||
                form.getFieldValue('username') !== profile.username ? (
                <Form.Item
                  label={<div>Current Password</div>}
                  name="password"
                  rules={[
                    { required: true, message: 'Please input your password!' },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              ) : null;
            }}
          </Form.Item>
          <Form.Item shouldUpdate className={styles['btn-container']}>
            {() => (
              <Button
                type="primary"
                disabled={
                  form.getFieldValue('email') === profile.email &&
                  form.getFieldValue('username') === profile.username
                }
                htmlType="submit"
              >
                Save Changes
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>
      <Divider />
      <div className={styles['deactivate-container']}>
        <div>
          <div className={styles.title}>Deactivate Account</div>
        </div>

        <div className={styles.subtitle}>
          Deactivate your account temporarily
        </div>

        <div>
          <div>
            <Button onClick={requestDeactivate} className={styles.deactivate}>
              Deactivate Account
            </Button>
          </div>
        </div>
      </div>
      <Modal
        visible={visible}
        title="Deactivate Account"
        wrapClassName={styles.container}
        okText="Deactivate Account"
        className={styles.modal}
        onOk={modalForm.submit}
        onCancel={() => setVisible(false)}
        okButtonProps={{ className: styles.ok }}
        cancelButtonProps={{ className: styles.cancel }}
      >
        <div>
          <Form
            layout="vertical"
            form={modalForm}
            onFinish={async () => {
              modalForm
                .validateFields()
                .then(async (values) => {
                  form.resetFields();
                  try {
                    await new ProfileAPI().deactivateProfile(values.password);
                    destroyState();
                    window.location.href = LOGOUT_ROUTE;
                  } catch (exception) {
                    message.error(
                      'Oops! something went wrong. Please check your password or your internet connection'
                    );
                  }
                })
                .catch((info) => {
                  message.error('Validation failed');
                  console.error('Validate Failed:', info);
                });
            }}
          >
            <Form.Item extra="Your account will be temporarily deactivated. You can activate your account by simply logging in. If you want to deactivate your account, please provide your password below." />
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default AccountSettingsForm;
