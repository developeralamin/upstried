import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'antd';
import clsx from 'clsx';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CategoryDataType } from '../../api/category/dataTypes';
import CategoryAPI from '../../api/category/request';
import ProfileAPI from '../../api/profile/request';
import { HTTP_SUCCESS_STATUS } from '../../config/api';
import { TipsInterface } from '../../interfaces/tips.interface';
import { getAuthUsername } from '../../services/authentication';
import Modal, { ModalBody } from '../elements/modal/Modal';
import TipsComments from '../tipsComments/TipsComments';
import TipDetails from '../tipsDetails/TipsDetails';
import TipsDetailsActions from '../tipsDetailsActions/TipsDetailsActions';
import TipsForm from '../tipsForm/TipsForm';
import TipsPracticeDetails from '../tipsPracticeDetails/TipsPracticeDetails';
import Topbar from '../topbar/Topbar';
import { TipsContentLayoutProps } from './TipsContentLayout.d';
import styles from './TipsContentLayout.module.scss';

// tasks?: any;
// setTasks?: any;
// loading?: boolean;
// setLoading?: any;

const TipsContentLayout = (props: TipsContentLayoutProps) => {
  const {
    tips,
    tasks,
    setTasks,
    loading,
    setLoading,
    progressStatus,
    setProgressStatus,
  } = props;
  const [tipsObj, setTipsObj] = useState<TipsInterface>({ ...tips });
  useEffect(() => {
    setTipsObj({ ...tips });
  }, [tips]);

  const router = useRouter();
  const { comments } = router.query;

  const commentModal = comments === 'show' ? true : false;

  const [categories, setCategories] = useState<CategoryDataType[]>([]);

  const [modal, setModal] = useState(false);
  const [profile, setProfile] = useState<any | null>();

  const getTags = async () => {
    const categoriesResponse = await CategoryAPI.all();
    if (categoriesResponse.status === HTTP_SUCCESS_STATUS) {
      setCategories(categoriesResponse.data);
    }
  };

  useEffect(() => {
    getTags();
  }, []);

  const setCommentModal = (requested: boolean) => {
    if (requested) {
      const path = `/books/${tips.slug}?comments=show`;
      router.query.comments = 'show';
      router.push(router, path, { shallow: true });
    } else {
      const path = `/books/${tips.slug}?comments=hide`;
      router.query.comments = 'hide';
      router.push(router, path, { shallow: true });
    }
  };

  const goTo = () => {
    const username = getAuthUsername();
    if (tips.enrolled) {
      router.push({
        pathname: '/authors/' + username,
        query: {
          tabId: 2,
        },
      });
    } else if (tips.saved) {
      router.push({
        pathname: '/authors/' + username,
        query: {
          tabId: 3,
        },
      });
    } else {
      router.push({
        pathname: '/',
      });
    }
  };

  const onTipActionToggle = () => {
    setCommentModal(commentModal ? false : true);
  };

  if (!tips.id) <Error statusCode={404} />;

  const onChangeHandler = (payload: any) => {
    setTipsObj({
      ...tipsObj,
      ...payload,
    });
  };

  const tipsEditForm = modal && (
    <Modal
      modalHeaderTitle="Edit Books"
      show={true}
      onClose={() => setModal(false)}
    >
      <ModalBody>
        <TipsForm
          tips={tipsObj}
          categories={categories}
          onClose={() => setModal(false)}
          onUpdate={onChangeHandler}
        />
      </ModalBody>
    </Modal>
  );

  const tipsEditFormToggler = (
    <Button className={styles.UpdateBtn} onClick={() => setModal(true)}>
      <FontAwesomeIcon icon={faPencilAlt} />
      <span>Edit This Books</span>
    </Button>
  );

  const tipsDetailsActions = (
    <TipsDetailsActions
      totalComment={props.totalComments}
      onTipActionToggle={onTipActionToggle}
      commentModalStatus={false}
      classes="action-lg"
      tipsSlug={tipsObj.slug}
      tipsSharableUrl={tipsObj.sharableUrl}
      tipsMute={tipsObj.mute}
      tipsEnrolled={tipsObj.enrolled}
      tipsEnrollmentStatus={tipsObj.enrollmentStatus}
      tipsSaved={tipsObj.saved}
      editable={tipsObj.editable}
      deletable={tipsObj.deletable}
      isOwnTips={tipsObj.isOwnTips}
      onChange={onChangeHandler}
      tipsEditForm={tipsEditForm}
      tipsEditFormToggler={tipsEditFormToggler}
      tipsTitle={tipsObj.title}
    />
  );

  const commentsWindowCloser = (
    <button
      className={clsx(styles.Toggler, commentModal && styles.TogglerActive)}
      onClick={() => setCommentModal(commentModal ? false : true)}
    >
      <FontAwesomeIcon icon={faTimes} />
    </button>
  );

  useEffect(() => {
    const getProfile = async () => {
      const profile = new ProfileAPI();
      const profileResponse = await profile.get();
      if (profileResponse) {
        setProfile(profileResponse);
      }
    };
    getProfile();
  }, []);

  return (
    <div className={styles.TipsDetails}>
      <Topbar profile={profile} />
      <div
        className={
          styles.TipsDetailsContainer +
          (commentModal ? ` ${styles.hasSidebar}` : '')
        }
      >
        <div onClick={goTo} className={styles.OverlayBar}></div>
        <div className={styles.TipsContentContainer}>
          {props.isPractice ? (
            <TipsPracticeDetails
              tasks={tasks}
              setTasks={setTasks}
              loading={loading}
              setLoading={setLoading}
              progressStatus={progressStatus}
              setProgressStatus={setProgressStatus}
              tips={tipsObj}
              commentsWindowCloser={commentsWindowCloser}
              tipsDetailsActions={tipsDetailsActions}
            />
          ) : (
            <TipDetails
              tips={tipsObj}
              commentsWindowCloser={commentsWindowCloser}
              tipsDetailsActions={tipsDetailsActions}
              profile={profile}
            />
          )}
          <div
            className={clsx(
              styles.TipsCommentContainer,
              commentModal && styles.Active
            )}
          >
            <TipsComments
              tipsSlug={tipsObj.slug}
              onToggleWindow={() => setCommentModal(!commentModal)}
              comments={props.comments}
              totalComments={props.totalComments}
              onTipActionToggle={onTipActionToggle}
              onCommentCreated={props.onCommentCreated}
              onCommentDeleted={props.onCommentDeleted}
            />
          </div>
        </div>
        {/*  <Button className={styles.goTo} onClick={goTo}>
          <FontAwesomeIcon icon={faTimes} />
        </Button> */}
      </div>
    </div>
  );
};

export default TipsContentLayout;
