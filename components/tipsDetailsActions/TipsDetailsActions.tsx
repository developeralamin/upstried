import {
  faAngleLeft,
  faBell,
  faCheck,
  faEllipsisH,
  faLink,
  faTimes,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal as ConfirmModal, Dropdown, Menu, message } from 'antd';
import clsx from 'clsx';
import _ from 'lodash';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import TipsAPI from '../../api/books/request';
import { HTTP_SUCCESS_STATUS } from '../../config/api';
import { TipsEnrollmentStatus } from '../../enums/Tips.enum';
import Icons from '../../lib/icons';
import { isAuthenticated } from '../../services/authentication';
import { getPendingSavingTips } from '../../services/pendingActions';
import { copyLink } from '../../services/util';
import ReportTips from '../reportTips/ReportTips';
import {
  TipsDetailsActionsProps,
  onDiscardInterface,
} from './TipsDetailsActions.d';
import styles from './TipsDetailsActions.module.scss';

const { confirm } = ConfirmModal;

const TipsDetailsActions: React.FC<TipsDetailsActionsProps> = (props) => {
  const {
    tipsSlug,
    tipsSharableUrl,
    tipsMute,
    tipsEnrolled,
    tipsEnrollmentStatus,
    tipsSaved,
    editable,
    deletable,
    isOwnTips,
    onChange,
    tipsEditForm,
    tipsEditFormToggler,
    tipsTitle,
  } = props;

  const [saveToggleStatus, setSaveToggleStatus] = useState(false);

  useEffect(() => {
    if (getPendingSavingTips(tipsSlug)) {
      saveTips();
    }
  }, []);

  const saveTips = async () => {
    const savedTipsResponse = await TipsAPI.save({
      slug: tipsSlug,
    });

    if (savedTipsResponse && savedTipsResponse.status === HTTP_SUCCESS_STATUS) {
      onChange({
        saved: true,
      });
      if (savedTipsResponse.message) {
        message.success(savedTipsResponse.message);
      }
    } else {
      if (savedTipsResponse) {
        message.error(savedTipsResponse.message);
      }
    }
  };

  const discardTips = async ({
    title,
    type,
    successMessage,
    failedMessage,
  }: onDiscardInterface) => {
    confirm({
      title,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      closable: true,
      className: 'tips-leave-modal',
      async onOk() {
        const prevEnrollmentStatus =
          type === 'unenroll' ? tipsEnrollmentStatus : '';
        try {
          switch (type) {
            case 'unenroll':
              onChange({
                enrolled: false,
                enrollmentStatus: TipsEnrollmentStatus.Enroll,
              });
              break;
            default:
              onChange({
                saved: false,
              });
              break;
          }

          _.delay(() => {
            message.success(successMessage);
          }, 400);
          await TipsAPI.discard({ slug: tipsSlug });
        } catch (error) {
          console.error(error);
          message.error(failedMessage);
          switch (type) {
            case 'unenroll':
              onChange({
                enrolled: true,
                enrollmentStatus: prevEnrollmentStatus,
              });
              break;
            default:
              onChange({
                saved: true,
              });
              break;
          }
        }
      },
    });
  };

  const copyTipsLink = () => {
    copyLink(tipsSharableUrl);
    message.success('Link copied!');
  };

  const deleteTips = async () => {
    confirm({
      title: 'Do you Want to delete this tips?',
      onOk() {
        TipsAPI.delete({
          slug: tipsSlug,
        }).then((response) => {
          if (response.status === HTTP_SUCCESS_STATUS) {
            message.success('Tips Deleted');
            router.push('/');
          }
        });
      },
    });
  };

  const toggleNotificationSettings = async () => {
    const response = await TipsAPI.toggleNotificationSettings({
      slug: tipsSlug,
      mute: tipsMute ? 0 : 1,
    });
    if (response.status === HTTP_SUCCESS_STATUS) {
      response.data.mute
        ? message.success('Notification Turned Off')
        : message.success('Notification Turned On');
      onChange({
        mute: response.data.mute,
      });
    }
  };
  return (
    <div
      className={clsx(
        styles.TipsDetailsActions,
        props.classes,
        props.commentModalStatus && styles.WithComments,
        `TipsDetailsActions`
      )}
    >
      <Button className={styles.MobileToggler}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </Button>
      {!tipsEnrolled && !tipsSaved ? (
        <Button
          onClick={saveTips}
          className={clsx(
            props.commentModalStatus && 'btn-radius',
            !props.commentModalStatus && styles.Btn
          )}
        >
          {Icons.tipsSaveIcon}
          {!props.commentModalStatus ? 'Save' : ''}
        </Button>
      ) : null}

      {!tipsEnrolled && tipsSaved ? (
        <Button
          onMouseEnter={() => setSaveToggleStatus(true)}
          onMouseLeave={() => setSaveToggleStatus(false)}
          onClick={() =>
            discardTips({
              title: 'Are you sure to unsave this tips?',
              type: 'unsaved',
              successMessage: 'Tips unsaved successfully',
              failedMessage: 'Tips unsaved failed',
            })
          }
          className={clsx(
            !saveToggleStatus && styles.SavedBtn,
            saveToggleStatus && styles.UnSaveBtn,
            'btn-radius'
          )}
        >
          <FontAwesomeIcon icon={saveToggleStatus ? faTimes : faCheck} />
          {!saveToggleStatus ? 'Saved' : 'Unsave'}
        </Button>
      ) : null}

      <Button
        onClick={() => props.onTipActionToggle()}
        className={clsx(
          props.commentModalStatus && 'btn-comments btn-radius',
          !props.commentModalStatus && styles.Btn
        )}
      >
        <span className={clsx(styles.CommentCount, 'CommentCount')}>
          {props.totalComment}
        </span>
        {Icons.commentIcon}
        {!props.commentModalStatus ? 'Comments' : ''}
      </Button>
      <Dropdown
        overlay={
          <Menu className="dropdown-style2 tips-details-actions">
            {tipsEnrolled ? (
              <Menu.Item key="0">
                {/* <Button
                  onClick={() =>
                    discardTips({
                      title: 'Are you sure to unenroll this tips?',
                      type: 'unenroll',
                      successMessage: 'Tips enrolled successfully!',
                      failedMessage: 'Tips enrolled failed!',
                    })
                  }
                >
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  <span>Unenroll This Books</span>
                </Button> */}
              </Menu.Item>
            ) : null}
            <Menu.Item key="1">
              <Button onClick={copyTipsLink}>
                <FontAwesomeIcon icon={faLink} />
                <span>Copy Link</span>
              </Button>
            </Menu.Item>
            {isAuthenticated() && tipsEnrolled ? (
              <Menu.Item key="2">
                <Button onClick={toggleNotificationSettings}>
                  <FontAwesomeIcon icon={faBell} />
                  <span>
                    {tipsMute
                      ? 'Turn On Notification'
                      : 'Turn Off Notification'}
                  </span>
                </Button>
              </Menu.Item>
            ) : null}
            {editable ? (
              <Menu.Item key="3">{tipsEditFormToggler}</Menu.Item>
            ) : null}
            {deletable ? (
              <Menu.Item key="4">
                <Button onClick={deleteTips}>
                  <FontAwesomeIcon icon={faTrash} />
                  <span>Delete Books</span>
                </Button>
              </Menu.Item>
            ) : null}
            {!isOwnTips ? (
              <Menu.Item key="5">
                <ReportTips tipsSlug={tipsSlug} />
              </Menu.Item>
            ) : null}
          </Menu>
        }
        trigger={['click']}
      >
        <Button
          className={clsx(
            props.commentModalStatus && 'btn-menu btn-radius',
            !props.commentModalStatus && styles.Btn
          )}
        >
          <FontAwesomeIcon icon={faEllipsisH} />
        </Button>
      </Dropdown>
      {tipsEditForm}
    </div>
  );
};

export default TipsDetailsActions;
