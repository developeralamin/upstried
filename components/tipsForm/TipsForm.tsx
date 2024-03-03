import { faListOl, faLock, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Form, Input, Modal, Row, Select, message } from 'antd';
import { CKEditor } from 'ckeditor4-react';
import clsx from 'clsx';
import { ContentState, EditorState } from 'draft-js';
import _ from 'lodash';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import TipsApi from '../../api/books/request';
import { LinkAttachInterface } from '../../interfaces/attachment.interface';
import TaskInterface from '../../interfaces/task.interface';
import {
  TipsInterface,
  TipsResponseInterface,
  UploadedAttachmentInterface,
} from '../../interfaces/tips.interface';
import InputError from '../inputError/InputError';
import {
  CreateTipsRequestInterface,
  MapTipsRequestInterface,
  TipsFormProps,
} from './TipsForm.d';
import styles from './TipsForm.module.scss';
import {
  uploadDescriptionAttachment,
  uploadTasksAttachment,
  uploadTipsAttachment,
} from './services/attachmentHandler';
import validate, { validateDescription } from './services/validator';
import TaskForm from './taskForm/TaskForm';
import Tasks from './tasks/Tasks';
import TipsAttachmentUploader from './tipsAttachmentUploader/TipsAttachmentUploader';

import TipsAudioUpload from './TipsAudioUpload';

const INITIAL_USER_INPUT = {
  title: '',
  description: '',
  attachments: [],
  privacy: 'public',
  tags: [],
  reading_time: '',
  short_description: '',
};

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};

const INITIAL_ERRORS = {
  tasks: '',
  title: '',
  description: '',
  descriptionAttachment: '',
  tags: '',
  category: '',
  reading_time: '',
  short_description: '',
};

const TipsForm: React.FC<TipsFormProps> = (props) => {
  const [audio_url, setAudioUrl] = useState<string>('');

  const onAudioUpload = (url: string) => {
    setAudioUrl(url);
  };

  const { t: text } = useTranslation('tips');
  const [error, setError] = useState(INITIAL_ERRORS);
  const [uploadedAttachment, setUploadedAttachment] =
    useState<UploadedAttachmentInterface>(
      props.tips?.attachment
        ? { preview: { ...props.tips.attachment }, file: null }
        : { preview: null, file: null }
    );
  const [titleFocused, setTitleFocused] = useState(false);
  const [addTaskVisibility, setAddTaskVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const [descriptionCount, setDescriptionCount] = useState(1000);
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);
  const [descAttachments, setDescAttachments] = useState<
    Array<LinkAttachInterface>
  >([]);
  const [taskEditMode, setTaskEditMode] = useState(false);
  const [tasks, setTasks] = useState<Array<TaskInterface>>([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { tips } = props;
  const isEditingTips = tips;

  const router = useRouter();

  useEffect(() => {
    if (tips) setInitialTips(tips);
  }, [props]);

  const [form] = Form.useForm();

  const setInitialTips = (tipsObj: TipsInterface) => {
    const {
      title,
      description,
      privacy,
      tags,
      category,
      tasks,
      reasons_to_read,
      summary,
      stories,
      learnings,
      short_description,
      reading_time,
      audio_url,
    } = tipsObj;
    setTasks(tasks);
    form.setFieldsValue({
      title,
      privacy,
      tags,
      category,
      description: description.content,
      reasons_to_read,
      summary,
      stories,
      learnings,
      short_description,
      reading_time,
      audio_url,
    });
    if (description) {
      setEditorState(
        EditorState.createWithContent(
          ContentState.createFromText(description.content)
        )
      );
      setDescAttachments(description.attachments);
      setIsDescriptionFocused(true);
    }
  };

  const onDescriptionChangeHandler = (editorData: EditorState) => {
    const description = editorData.getCurrentContent().getPlainText();
    const errors = validateDescription(description);
    if (!_.isEmpty(errors)) {
      setError(errors);
      return;
    }
    resetError('description');
    setEditorState(editorData);
    const modifiedDescription = description.replace(/\n{3,}/g, '\n\n\n');
    setDescriptionCount(1000 - modifiedDescription.length);
    form.setFieldsValue({ description: modifiedDescription });
  };

  const onTaskCreate = (newTask: TaskInterface) => {
    resetError('tasks');
    setTasks((prevTasks: Array<TaskInterface>) => [...prevTasks, newTask]);
    setAddTaskVisibility(true);
  };

  const onUpdateTask = (updateTask: TaskInterface) => {
    setTasks((prevTasks: Array<TaskInterface>) => [
      ...prevTasks.map((task: TaskInterface) => {
        if (task.id === updateTask.id) {
          return { ...updateTask };
        }
        return task;
      }),
    ]);
    setTaskEditMode(false);
    setAddTaskVisibility(false);
  };

  const onDeleteTask = (id: any) => {
    setTasks((prevTasks: Array<TaskInterface>) =>
      prevTasks.filter((task: TaskInterface) => task.id !== id)
    );
  };

  const mapTipsRequest = (request: MapTipsRequestInterface) => ({
    ...request,
    tasks,
    description: {
      content: request.description,
      attachments: descAttachments,
    },
  });

  const mapTasks = (
    tasks: Array<TaskInterface>,
    tasksAttachments: Array<LinkAttachInterface>
  ) => {
    const attachmentsByTaskId = _.groupBy(tasksAttachments, 'taskId');
    return tasks.map((task: TaskInterface) => {
      const attachments = attachmentsByTaskId[task.id];
      const filteredAttachments = attachments?.filter(
        (attachment: LinkAttachInterface) => attachment && attachment.url
      );
      const finalAttachments = filteredAttachments?.map((attachment) => ({
        url: attachment.url,
        type: attachment.type,
        name: attachment.name,
      }));
      return {
        ...task,
        attachments: finalAttachments || [],
      };
    });
  };

  const mapUserInput = (
    request: CreateTipsRequestInterface,
    tipsAttachment: any,
    descriptionAttachments: Array<UploadedAttachmentInterface>,
    tasksAttachments: Array<LinkAttachInterface>,
    audio_url: any
  ) => ({
    ...request,
    attachment: tipsAttachment,
    description: {
      ...request.description,
      attachments: descriptionAttachments,
    },
    tasks: mapTasks(tasks, tasksAttachments),
    audio_url: audio_url,
  });

  const getDefaultThumbnail = (category: string) =>
    _.find(props.categories, {
      name: category,
    }).attachment;

  const submitForm = (request: CreateTipsRequestInterface) => {
    setError(INITIAL_ERRORS);
    const errors = validate(request);
    if (!_.isEmpty(errors)) {
      setError(errors);
      return;
    }
    setLoading(true);
    Promise.all([
      uploadTasksAttachment(tasks),
      uploadTipsAttachment(
        uploadedAttachment,
        getDefaultThumbnail(request.category)
      ),
      uploadDescriptionAttachment(descAttachments),
    ]).then(
      async ([
        tasksAttachments,
        tipsAttachment,
        descriptionAttachments,
      ]: any) => {
        try {
          const userInput: any = mapUserInput(
            request,
            tipsAttachment,
            descriptionAttachments,
            tasksAttachments,
            audio_url
          );
          if (isEditingTips) userInput['tipsSlug'] = tips?.slug;
          const response: TipsResponseInterface = isEditingTips
            ? await TipsApi.update(userInput)
            : await TipsApi.create(userInput);
          isEditingTips
            ? afterUpdatedTips(response)
            : afterCreatedTips(response);
        } catch (error) {
          isEditingTips ? afterUpdadteFailedTips() : afterCreationFailedTips();
        }
      }
    );
  };

  const afterCreatedTips = (response: TipsResponseInterface) => {
    const { detailsUrl } = response.data;
    message.success(text('create.message.success'));
    setUploadedAttachment({
      preview: null,
      file: null,
    });
    form.resetFields();
    router.push(detailsUrl);
    props.onClose();
  };

  const afterUpdatedTips = (response: TipsResponseInterface) => {
    message.success(text('update.message.success'));
    props.onUpdate(response.data);
    setLoading(false);
    props.onClose();
  };

  const afterCreationFailedTips = () => {
    message.error(text('create.message.failed'));
    setLoading(false);
    props.onClose();
  };

  const afterUpdadteFailedTips = () => {
    message.error(text('update.message.failed'));
    setLoading(false);
    props.onClose();
  };

  const onChangeDescLinkAndAttch = (
    attachments: Array<LinkAttachInterface>
  ) => {
    setDescAttachments((prevAttachments: Array<LinkAttachInterface>) => [
      ...prevAttachments,
      ...attachments,
    ]);
  };

  const onRemoveDescAttach = (i: number) => {
    setDescAttachments((prevAttachments: Array<LinkAttachInterface>) =>
      prevAttachments.filter(
        (attachment: LinkAttachInterface, index: number) => index !== i
      )
    );
    form.setFieldsValue({ description_attachments: descAttachments });
  };

  const onDescriptionFocused = () => {
    setIsDescriptionFocused(true);
  };

  const taskEditModeHandler = (changedTask: boolean) => {
    if (changedTask) {
      setTaskEditMode(true);
      setAddTaskVisibility(false);
    } else {
      setTaskEditMode(false);
    }
  };

  const setErrorMessage = (key: string, value: string) =>
    setError((prevError) => ({
      ...prevError,
      [key]: value,
    }));

  const onTagsChange = (tags: Array<string>) => {
    if (tags.length > 10) {
      setErrorMessage('tags', text('validation.message.tags.length'));
      return;
    }
    resetError('tags');
    form.setFieldsValue({ tags });
  };

  const handleDescriptionBeforeInput = (value: string) => {
    const currentContent = editorState.getCurrentContent();
    const currentContentLength = currentContent.getPlainText('').length;
    if (currentContentLength > 1000 - 1) {
      setErrorMessage(
        'description',
        text('validation.message.description.length')
      );
      return 'handled';
    }
    resetError('description');
    return 'not-handled';
  };

  const handleDescriptionPastedText = (pastedText: string) => {
    const currentContent = editorState.getCurrentContent();
    const currentContentLength = currentContent.getPlainText('').length;
    if (currentContentLength + pastedText.length > 1000) {
      setError((prevError) => ({
        ...prevError,
        description: 'You can type max 1000 characters',
      }));
      return 'handled';
    }
    setError((prevError) => ({
      ...prevError,
      description: '',
    }));
    return 'not-handled';
  };

  const onAddTaskVisibilityHandler = (visibility: boolean) => {
    setAddTaskVisibility(visibility);
    setTaskEditMode(false);
  };

  const discardModal = () => {
    Modal.confirm({
      className: 'tips-discard-modal',
      title: 'Discard Changed',
      content: <p>Are you sure to discard form</p>,
      okText: 'Discard',
      okType: 'primary',
      cancelText: 'Cancel',
      onOk() {
        props.onClose();
      },
    });
  };

  const resetError = (type: string) =>
    setError((prevError) => ({
      ...prevError,
      [type]: '',
    }));

  return (
    <div className={styles.TipsForm}>
      <Form
        {...layout}
        form={form}
        name="basic"
        initialValues={INITIAL_USER_INPUT}
        onFinish={(request: any) => submitForm(mapTipsRequest(request))}
        onKeyDown={(e) => (e.keyCode == 13 ? e.preventDefault() : '')}
      >
        <div className={styles.ContentWrapper}>
          <div className={styles.Wrapper}>
            <div className={styles.FormTitle}>
              <h4>Title</h4>
              <div className={styles.PrivacyCategory}>
                <Form.Item label="" name="category" className={styles.Category}>
                  <Select
                    onChange={() => resetError('category')}
                    placeholder="Select category"
                    style={{ width: 150 }}
                    getPopupContainer={(triggerNode: HTMLElement) =>
                      triggerNode.parentNode as HTMLElement
                    }
                  >
                    {props.categories?.map((tag: any, index: number) => (
                      <Select.Option key={index} value={tag.name}>
                        <span>{tag.name}</span>
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item label="" name="privacy" className={styles.Privacy}>
                  <Select
                    onChange={() => resetError('privacy')}
                    defaultValue="public"
                    style={{ width: 130 }}
                    getPopupContainer={(triggerNode: HTMLElement) =>
                      triggerNode.parentNode as HTMLElement
                    }
                  >
                    <Select.Option value="public">
                      <FontAwesomeIcon
                        style={{ marginRight: '15px' }}
                        icon={faUsers}
                      />
                      Public
                    </Select.Option>
                    <Select.Option value="private">
                      <FontAwesomeIcon
                        style={{ marginRight: '15px' }}
                        icon={faLock}
                      />
                      Private
                    </Select.Option>
                    <Select.Option value="unlisted">
                      <FontAwesomeIcon
                        style={{ marginRight: '15px' }}
                        icon={faListOl}
                      />
                      Unlisted
                    </Select.Option>
                  </Select>
                </Form.Item>
              </div>
            </div>

            {error.category && <InputError errorMessage={error.category} />}

            <div className={styles.TitleWrapper}>
              <div
                className={clsx(
                  styles.Title,
                  titleFocused && styles.TitleFocused
                )}
              >
                <Form.Item label="" name="title">
                  <Input.TextArea
                    onFocus={() => setTitleFocused(true)}
                    onBlur={() => setTitleFocused(false)}
                    onChange={() => resetError('title')}
                    placeholder="Title"
                    autoSize
                  />
                </Form.Item>
              </div>
              <TipsAttachmentUploader
                attachment={uploadedAttachment.preview}
                onChange={(attachment: UploadedAttachmentInterface) =>
                  setUploadedAttachment(attachment)
                }
              />
            </div>
            <div className={styles.FormTitle}>
              <h4>Short Description</h4>
            </div>
            <div>
              <Form.Item className={styles.ShortTitle} name="short_description">
                <Input
                  onChange={() => resetError('short_description')}
                  placeholder="Short Description"
                  className={styles.ShortTitle}
                />
              </Form.Item>
            </div>
            {error.short_description && (
              <InputError errorMessage={error.short_description} />
            )}

            <div className={styles.Body}>
              <h4>Reasons to Read</h4>
              <Form.Item label="" name="reasons_to_read">
                <CKEditor
                  editorUrl="https://cdn.ckeditor.com/4.22.1/standard/ckeditor.js"
                  onChange={(event) => {
                    form.setFieldsValue({
                      reasons_to_read: event.editor.getData(),
                    });
                  }}
                  initData={props?.tips?.reasons_to_read}
                />
              </Form.Item>
              <h4>Introduction</h4>
              <Form.Item label="" name="description">
                <CKEditor
                  editorUrl="https://cdn.ckeditor.com/4.22.1/standard/ckeditor.js"
                  onChange={(event) => {
                    form.setFieldsValue({
                      description: event.editor.getData(),
                    });
                  }}
                  initData={props?.tips?.description?.content}
                />
              </Form.Item>
              {error.description && (
                <InputError errorMessage={error.description} />
              )}
              {error.descriptionAttachment && (
                <InputError errorMessage={error.descriptionAttachment} />
              )}
              <h4>Summary & Key Takeaways</h4>
              <Form.Item label="" name="summary">
                <CKEditor
                  editorUrl="https://cdn.ckeditor.com/4.22.1/standard/ckeditor.js"
                  onChange={(event) => {
                    form.setFieldsValue({
                      summary: event.editor.getData(),
                    });
                  }}
                  initData={props?.tips?.summary}
                />
              </Form.Item>
              <h4>Stories & Experiments</h4>
              <Form.Item label="" name="stories">
                <CKEditor
                  editorUrl="https://cdn.ckeditor.com/4.22.1/standard/ckeditor.js"
                  onChange={(event) => {
                    form.setFieldsValue({
                      stories: event.editor.getData(),
                    });
                  }}
                  initData={props?.tips?.stories}
                />
              </Form.Item>
              <h4>Learnings</h4>
              <Form.Item label="" name="learnings">
                <CKEditor
                  editorUrl="https://cdn.ckeditor.com/4.22.1/standard/ckeditor.js"
                  onChange={(event) => {
                    form.setFieldsValue({
                      learnings: event.editor.getData(),
                    });
                  }}
                  initData={props?.tips?.learnings}
                />
              </Form.Item>
              <Tasks
                onUpdate={onUpdateTask}
                tasks={tasks}
                onDelete={onDeleteTask}
                onEditModeChange={taskEditModeHandler}
                addTaskVisibility={addTaskVisibility}
              />
              {error.tasks && <InputError errorMessage={error.tasks} />}
              <TaskForm
                taskEditMode={taskEditMode}
                onCreated={onTaskCreate}
                submitLabel="Add Task"
                onAddTaskVisibilityChange={onAddTaskVisibilityHandler}
                addTaskVisibility={addTaskVisibility}
              />
              <h4 className={styles.TagsTitle}>Tags</h4>
              <Row>
                <Col span={13}>
                  <Form.Item label="" name="tags" className={styles.Tags}>
                    <Select
                      mode="tags"
                      dropdownClassName="input-tags"
                      className={styles.Tags}
                      placeholder="Type and enter tags"
                      onChange={onTagsChange}
                    ></Select>
                  </Form.Item>
                  {error.tags && <InputError errorMessage={error.tags} />}
                </Col>
                <Col span={1}></Col>
                <Col span={9}>
                  <div className={styles.ReadingFormTitle}>
                    <h4>Reading Time</h4>
                  </div>
                  <Form.Item name="reading_time" className={styles.ReadingTime}>
                    <Input
                      onChange={() => resetError('reading_time')}
                      placeholder="Reading time"
                      className={styles.ReadingTime}
                    />
                  </Form.Item>
                  {error.reading_time && (
                    <InputError errorMessage={error.reading_time} />
                  )}
                </Col>
              </Row>
              <TipsAudioUpload onAudioUpload={onAudioUpload} />
              {props.tips && tips.audio_url && (
                <div>
                  <audio controls>
                    <track kind="captions" src="" label="English captions" />
                    <source src={tips.audio_url} type="audio/mpeg" />
                  </audio>
                </div>
              )}
            </div>
          </div>
          <div className={styles.Footer}>
            <Button onClick={discardModal}>Discard</Button>
            <Button
              type="primary"
              loading={loading}
              htmlType="submit"
              className={styles.PostTipsBtn}
            >
              {props.tips ? 'Update' : 'Post'}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default TipsForm;
