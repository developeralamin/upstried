import { Tooltip } from 'antd';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { TipsEnrollmentStatus } from '../../enums/Tips.enum';
import { strlen } from '../../services/util';
import TipsMeta from '../tipsMeta/TipsMeta';
import { TipsListItemProps } from './TipsListItem.d';
import styles from './TipsListItem.module.scss';
import TipsAttachment from './tipsAttachment/TipsAttachment';
import TipsFooter from './tipsFooter/TipsFooter';

const TipsListItem: React.FC<TipsListItemProps> = (props) => {
  const { tips, hideMeta, privacyActive } = props;
  const imageAttachmentUrl =
    tips.attachment?.url || tips.thumbnailObj?.url || '';
  const router = useRouter();

  const goToDetails = () => {
    const redirectTo =
      tips.enrollmentStatus === TipsEnrollmentStatus.Enrolled
        ? tips.detailsUrl
        : tips.detailsUrl;
    router.push(redirectTo);
  };

  // const goTo =
  //   tips.enrollmentStatus === TipsEnrollmentStatus.Enrolled
  //     ? tips.practiceUrl
  //     : tips.detailsUrl;

  return (
    <div
      className={clsx(
        styles.TipsListItem,
        'TipsListItem',
        props.singleView && styles.SingleStyle
      )}
      data-testid="tips-list-item"
    >
      <div
        className={styles.Top}
        onClick={
          !props.disableLink ? goToDetails : (ev: any) => console.warn(ev)
        }
      >
        <TipsAttachment
          attachment={tips.attachment}
          thumbnailObj={!props.singleView ? tips.thumbnailObj : null}
        />
      </div>
      <div className={styles.Middle}>
        {!props.hideTitle ? (
          <div>
            {!props.disableLink ? (
              <Link
                href={`/book/${tips.id}/${tips.slug}/details`}
                key={tips.id}
              >
                <h2 data-testid="tipsListItem_title" className={styles.Title}>
                  <Tooltip title={tips.title} style={{ padding: '50px' }}>
                    <span>{strlen(tips.title, 30)}</span>
                  </Tooltip>
                </h2>
              </Link>
            ) : (
              <h4 data-testid="tipsListItem_title" className={styles.Title}>
                <Tooltip title={tips.title}>
                  <span>{strlen(tips.title, 50)}</span>
                </Tooltip>
              </h4>
            )}
          </div>
        ) : null}
        {!hideMeta && (
          <TipsMeta
            author={tips.author}
            category={tips.category}
            categoryUrl={tips.categoryUrl}
            tipsPrivacy={tips.privacy}
            privacyActive={privacyActive}
          />
        )}
      </div>
      <div className={styles.Bottom}>
        <div className={styles.TipsToolbarContainer}>
          <TipsFooter
            tipsReaction={tips.reacted}
            tipsTotalReactions={tips.totalLikes}
            tipsTotalEnrollments={tips.totalEnrollments}
            tipsEnrolled={tips.enrolled}
            tipsEnrollmentStatus={tips.enrollmentStatus}
            tipsLastEnrollment={tips.lastEnrollment}
            title={tips.title}
            detailsLink={tips.sharableUrl}
            tipsKeySlug={tips.slug}
            tipsKeyId={tips.id}
            pacticeUrl={tips.practiceUrl}
            imageAttachmentUrl={imageAttachmentUrl}
            tipsAuthor={tips.author.name}
            tipsCategory={tips.category}
          />
        </div>
      </div>
    </div>
  );
};

export default TipsListItem;
