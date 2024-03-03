import { RightOutlined } from '@ant-design/icons';
import { Tooltip, message } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import router from 'next/router';
import { useEffect, useState } from 'react';
import TipsAPI from '../../api/books/request';
import { HTTP_SUCCESS_STATUS } from '../../config/api';
import { TipsBaseInterface } from '../../interfaces/tips.interface';
import Footer from '../footer/Footer';
import TipsAttachment from '../tipsListItem/tipsAttachment/TipsAttachment';
import styles from './SingleTips.module.scss';

interface SingleTipsDetailsProps {
  tips: TipsBaseInterface;
  profile: any;
}

const SingleTipsDetails: React.FC<SingleTipsDetailsProps> = (props) => {
  const { tips, profile } = props;
  const [likeTips, setLikeTips] = useState<TipsBaseInterface[]>([]);
  const [categoryTips, setCategoryTips] = useState<TipsBaseInterface[]>([]);

  const { t } = useTranslation('tips');
  const enroll = async () => {
    try {
      const response = await TipsAPI.enroll({ slug: tips.slug });
      message.success(t('enroll.message.success'));
      if (response && response.status === HTTP_SUCCESS_STATUS) {
        router.push(response.data?.singleTipsUrl as string);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const expire_date = new Date(profile?.expire_date);
  const todayDate = new Date();
  const expireDateNull = profile?.expire_date === '';

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await TipsAPI.likeTips();
        if (response) {
          setLikeTips(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    const fetchCategoryBasedTips = async (slug) => {
      try {
        const response = await TipsAPI.categoryBasedTips(slug);
        if (response) {
          setCategoryTips(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTips();
    fetchCategoryBasedTips(tips.slug);
  }, []);

  const getTruncatedTitle = (title) => {
    return title.length > 20 ? title.substring(0, 20) + '...' : title;
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.MainSingleTips}>
          <div className={styles.BredCamb}>
            <span>Home </span>{' '}
            <span>
              <RightOutlined />
            </span>{' '}
            <span>{tips.title}</span>
          </div>
          <div className={styles.SingleTips}>
            <div className={styles.TipsDetails}>
              <TipsAttachment
                className={styles.imageWidth}
                attachment={tips.attachment}
                thumbnailObj={!props.singleView ? tips.thumbnailObj : null}
              />
              <div className={styles.ShareMarkButton}>
                <span className={styles.Icon1}>
                  <img src="/books/share.png" />
                </span>
                <span className={styles.Icon2}>
                  <img src="/books/save.png" />
                </span>
              </div>
            </div>
            <div className={styles.RightContent}>
              <div>
                <h3 className={styles.Tittle}> {tips.title}</h3>
                <p className={styles.Des}>
                  by {tips.author.name} Category {tips.category}
                </p>
              </div>
              <div className={styles.Button}>
                <Link href={`/books/${tips.id}/${tips.slug}`}>
                  <button className={styles.ReadButton}>
                    <img src="/books/read.png" />
                    Read
                  </button>
                </Link>

                <Link href={`/books/${tips.id}/${tips.slug}`}>
                  <button className={styles.ListenButton}>
                    <img src="/books/listen.png" />
                    Listen
                  </button>
                </Link>
              </div>
              {expireDateNull || expire_date < todayDate ? (
                <Link href="/packages">
                  <button className={styles.TakeActionBtn}>
                    Subscribe to Take Action
                  </button>
                </Link>
              ) : tips.enrollmentStatus === 'enroll' ? (
                <button className={styles.TakeActionBtn} onClick={enroll}>
                  Enroll to Take Action
                </button>
              ) : (
                <Link
                  href={`/books/enrollments/${tips.lastEnrollment.id}/practice`}
                >
                  <button className={styles.TakeActionBtn}>Take Action</button>
                </Link>
              )}

              <div className={styles.Time}>
                <img src="/books/time.png" />
                {tips.reading_time} min
              </div>
              <div className={styles.Description}>
                <h3>Reasons to read</h3>
                <p
                  dangerouslySetInnerHTML={{ __html: tips.reasons_to_read }}
                ></p>
              </div>
            </div>
          </div>
        </div>

        {/* like tips section */}
        <div>
          <div className={styles.LikeTips}>
            <h2>You might also like</h2>
            <p> Lorem ipsum dolor sit amet, consectetur adipisicing. </p>
          </div>
        </div>
        {/* card section */}
        <div className={styles.CardContainer}>
          {likeTips.length > 0 ? (
            likeTips.map((tipsLike, index) => (
              <div className={styles.SingleCard} key={index}>
                <div className={styles.BgWhiteColor}></div>
                <div className={styles.CardContent}>
                  <button> {tipsLike.category}</button>
                  <Link
                    href={`/book/${tipsLike.id}/${tipsLike.slug}/details`}
                    key={tipsLike.id}
                  >
                    <h3>
                      <Tooltip
                        title={tipsLike.title}
                        style={{ padding: '50px' }}
                      >
                        <span>{getTruncatedTitle(tipsLike.title)}</span>
                      </Tooltip>
                    </h3>
                  </Link>
                  <h4>{tipsLike.author.name}</h4>
                  <p>{tipsLike.short_description}</p>
                </div>
                <div>
                  <img
                    className={styles.CardIamge}
                    src={tipsLike.attachment.url}
                  />
                  <div className={styles.lockIcon}>
                    <span>
                      <img src="/books/lock.png" />
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No books available</div>
          )}
        </div>
        <div className={styles.ViewButton}>
          <button> View All</button>
        </div>
        {/* popular tips section */}
        <div>
          <div className={styles.LikeTips}>
            <h2>Popular Books</h2>
            <p> Lorem ipsum dolor sit amet, consectetur adipisicing. </p>
          </div>
        </div>
        {/* card section */}

        <div className={styles.CardContainer}>
          {categoryTips.length > 0 ? (
            categoryTips.map((catTips, index) => (
              <div className={styles.SingleCard} key={index}>
                <div className={styles.BgWhiteColor}></div>
                <div className={styles.CardContent}>
                  <button> {catTips.category}</button>
                  <Link
                    href={`/book/${catTips.id}/${catTips.slug}/details`}
                    key={catTips.id}
                  >
                    <h3>
                      <Tooltip
                        title={catTips.title}
                        style={{ padding: '50px' }}
                      >
                        <span>{getTruncatedTitle(catTips.title)}</span>
                      </Tooltip>
                    </h3>
                  </Link>
                  <h4>{catTips.author.name}</h4>
                  <p>{catTips.short_description}</p>
                </div>
                <div>
                  <img
                    className={styles.CardIamge}
                    src={catTips.attachment.url}
                    alt=""
                  />
                  <div className={styles.lockIcon}>
                    <span>
                      <img src="/books/lock.png" />
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No books available</div>
          )}
        </div>
        <div className={styles.ViewButton}>
          <button> View All</button>
        </div>
        {/* input field */}
      </div>

      <Footer />
    </div>
  );
};

export default SingleTipsDetails;
