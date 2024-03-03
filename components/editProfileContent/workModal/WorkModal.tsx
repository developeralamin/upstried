import {
  Checkbox,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Tooltip,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import moment from 'moment';
import React from 'react';
import { WorkplaceObj } from '../../../api/authors/dataTypes';
import styles from './WorkModal.module.scss';

interface WorkModalProps {
  initial?: WorkplaceObj;
  visible: boolean;
  onSubmit: (values: WorkplaceObj) => void;
  onCancel: () => void;
}

const WorkModal: React.FC<WorkModalProps> = (props: WorkModalProps) => {
  const [form] = useForm();
  const { initial, visible, onSubmit, onCancel } = props;

  const onOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onSubmit({
          ...values,
          start: values.start.format('MM-YYYY'),
          end: values.isPresent ? '' : values.end.format('MM-YYYY'),
        });
      })
      .catch((info) => {
        message.error('Validation failed');
        console.error('Validate Failed:', info);
      });
  };

  return (
    <Modal
      visible={visible}
      title={initial ? 'Edit workplace' : 'Add a new workplace'}
      okText={initial ? 'Save' : 'Add'}
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={form.submit}
      wrapClassName={styles.container}
      okButtonProps={{ className: styles.ok }}
      cancelButtonProps={{ className: styles.cancel }}
    >
      <Form
        form={form}
        name="form_in_modal"
        initialValues={
          initial
            ? {
                ...initial,
                start: moment(initial.start, 'MM-YYYY'),
                end: initial.isPresent
                  ? moment()
                  : moment(initial.end, 'MM-YYYY'),
              }
            : { start: moment(), end: moment() }
        }
        className={styles.form}
        onFinish={onOk}
      >
        <Form.Item
          label={<div>Work Title</div>}
          name="position"
          rules={[{ required: true, message: 'Please input your position!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<div>Workplace</div>}
          name="workplace"
          rules={[{ required: true, message: 'Please input your workplace!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<div>Start</div>}
          name="start"
          rules={[{ required: true, message: 'Please input a start date!' }]}
        >
          <DatePicker picker="month" format="MMM YYYY" allowClear={false} />
        </Form.Item>
        <Form.Item
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.isPresent !== currentValues.isPresent ||
            prevValues.start !== currentValues.start
          }
          className={styles.extra}
        >
          {({ getFieldValue, setFieldsValue }) => {
            getFieldValue('start')?.isAfter(getFieldValue('end')) &&
              setFieldsValue({ end: getFieldValue('start') });
            return (
              <Form.Item
                label={<div>End</div>}
                name="end"
                rules={
                  !getFieldValue('isPresent')
                    ? [
                        {
                          required: !getFieldValue('isPresent'),
                          message: 'Please input a end date!',
                        },
                      ]
                    : []
                }
              >
                <DatePicker
                  picker="month"
                  format="MMM YYYY"
                  disabledDate={(d) => !d || d.isBefore(getFieldValue('start'))}
                  disabled={getFieldValue('isPresent')}
                  allowClear={false}
                />
              </Form.Item>
            );
          }}
        </Form.Item>
        <Form.Item valuePropName="checked" name="isPresent">
          <Checkbox className={styles.checkbox}>I currently work here</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default WorkModal;
