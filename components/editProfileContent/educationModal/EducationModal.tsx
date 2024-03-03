import { Checkbox, DatePicker, Form, Input, message, Modal } from 'antd';
import React from 'react';
import { useForm } from 'antd/lib/form/Form';
import styles from './EducationModal.module.scss';
import moment from 'moment';
import { EducationObj } from '../../../api/authors/dataTypes';

interface EducationModalProps {
  initial?: EducationObj;
  visible: boolean;
  onSubmit: (values: EducationObj) => void;
  onCancel: () => void;
}

const EducationModal: React.FC<EducationModalProps> = (
  props: EducationModalProps
) => {
  const { initial, visible, onSubmit, onCancel } = props;
  const [form] = useForm();

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
      wrapClassName={styles.container}
      visible={visible}
      title="Add a new degree"
      okText={initial ? 'Save' : 'Add'}
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={form.submit}
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
          label={<div>Degree</div>}
          name="degree"
          rules={[{ required: true, message: 'Please input your degree!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<div>Institution</div>}
          name="institution"
          rules={[
            { required: true, message: 'Please input your institution!' },
          ]}
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
          <Checkbox>I currently study here</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EducationModal;
