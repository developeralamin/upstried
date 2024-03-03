import { Button, Form, Input, message } from 'antd';
import { useEffect, useState } from 'react';
import CommentsAPI from '../../api/comments/request';
import { HTTP_SUCCESS_STATUS } from '../../config/api';
import { COMMENT_INPUT_EMPTY_ERROR } from '../../config/messages';
import styles from './TipsCommentForm.module.scss';

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};

export interface TipsCommentFormProps {
  tipsSlug: string;
  onCommentCreated?: any;
  title?: string;
  isEditable?: boolean;
  isRepliable?: boolean;
  submitLabel?: string;
  onCommentCancel?: any;
  parentId?: string;
  comment?: any;
  onCommentUpdated?: any;
}

const TipsCommentForm: React.FC<TipsCommentFormProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => form.setFieldsValue({ comment: props.comment?.comment }), []);

  const createComment = async (values: any) => {
    setLoading(true);

    const createdCommentResponse = await CommentsAPI.create({
      parentId: props.parentId,
      feedback: values.comment,
      tipsSlug: props.tipsSlug,
    });

    if (
      createdCommentResponse.status === HTTP_SUCCESS_STATUS &&
      props.onCommentCreated
    ) {
      form.resetFields();
      props.onCommentCreated(createdCommentResponse.data);
      if (createdCommentResponse.message) {
        message.success(createdCommentResponse.message);
      }

      setLoading(false);
    }
  };

  const updateComment = async (values: any) => {
    setLoading(true);

    const updatedCommentResponse = await CommentsAPI.update({
      feedback: values.comment,
      comment: props.comment,
      tipId: props.tipsSlug,
    });
    if (
      updatedCommentResponse.status === HTTP_SUCCESS_STATUS &&
      props.onCommentUpdated
    ) {
      props.onCommentUpdated(updatedCommentResponse.data);
      if (updatedCommentResponse.message) {
        message.success(updatedCommentResponse.message);
      }
      setLoading(false);
    }
  };

  const onFinish = async (values: any) =>
    props.isEditable ? updateComment(values) : createComment(values);

  const onFinishFailed = (errorInfo: any) => {
    console.error('Failed:', errorInfo);
  };
  return (
    <div className={styles.CommentForm}>
      <p>{props.title}</p>
      <Form
        {...layout}
        name="commentForm"
        form={form}
        initialValues={{ comment: props.comment ? props.comment.comment : '' }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className={
          props.isEditable || props.isRepliable
            ? styles.Editable
            : styles.Creatable + ' ' + styles.CreatableForm
        }
      >
        <Form.Item
          label=""
          name="comment"
          rules={[{ required: true, message: COMMENT_INPUT_EMPTY_ERROR }]}
        >
          <Input
            placeholder="Write your comments here"
            className={styles.Feedback}
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item>
          <Button
            className={styles.Submit}
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            {props.submitLabel ? props.submitLabel : 'Post'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TipsCommentForm;
