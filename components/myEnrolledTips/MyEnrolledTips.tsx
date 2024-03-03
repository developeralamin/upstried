import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import styles from './MyEnrolledTips.module.scss';
import {
  SERVER_TIPS_ENROLLED_FETCH_ENDPOINT,
  SERVER_TIPS_ENROLLMENTS_ENDPOINT,
} from '../../config/endpoints';
import TipsAPI from '../../api/books/request';
import TipsList from '../tipsList/TipsList';
import { TipsEnrollementTypes as Types } from '../../enums/Tips.enum';
import {
  TipsBaseInterface,
  TipsMetaInterface,
} from '../../interfaces/tips.interface';
import { enrolledTipsResolver } from '../../api/books/mapper';

const { TabPane } = Tabs;

interface Props {
  username: string;
  privacyOn?: boolean;
}

function MyEnrolledTips(props: Props) {
  useEffect(() => {
    getCurrentlyEnrolledTips(Types.Completed);
    getCurrentlyEnrolledTips(Types.Current);
  }, []);

  const [currentlyEnrolledTips, setCurrentlyEnrolledTips] = useState<
    Array<TipsBaseInterface>
  >([]);
  const [currentlyEnrolledMeta, setCurrentlyEnrolledMeta] =
    useState<TipsMetaInterface | null>(null);
  const [completedEnrolledTips, setCompletedEnrolledTips] = useState<
    Array<TipsBaseInterface>
  >([]);
  const [completedEnrolledMeta, setCompletedEnrolledMeta] =
    useState<TipsMetaInterface | null>(null);
  const [loading, setLoading] = useState(false);
  const endpoint = SERVER_TIPS_ENROLLMENTS_ENDPOINT.replace(
    ':username',
    props.username
  );

  const getCurrentlyEnrolledTips = async (type: Types) => {
    setLoading(true);
    const endpoint = SERVER_TIPS_ENROLLMENTS_ENDPOINT.replace(
      ':username',
      props.username
    );
    try {
      const response = await TipsAPI.fetchTips(
        {
          endpoint,
          params: { type },
        },
        enrolledTipsResolver
      );

      if (type === Types.Current) {
        setCurrentlyEnrolledTips(response.data);
        setCurrentlyEnrolledMeta(response.meta);
      }

      if (type === Types.Completed) {
        setCompletedEnrolledTips(response.data);
        setCompletedEnrolledMeta(response.meta);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className={styles.MyEnrolledTips}>
      <Tabs>
        <TabPane
          tab={
            <span>
              Currently Enrolled
              <span className="badge">{currentlyEnrolledMeta?.total || 0}</span>
            </span>
          }
          key="1"
        >
          {!loading && currentlyEnrolledMeta && (
            <TipsList
              resResolver={enrolledTipsResolver}
              searchbar={true}
              params={{ type: Types.Current }}
              endpoint={endpoint}
              tips={currentlyEnrolledTips}
              meta={currentlyEnrolledMeta}
            />
          )}
        </TabPane>
        <TabPane
          tab={
            <span>
              Completed
              <span className="badge">{completedEnrolledMeta?.total || 0}</span>
            </span>
          }
          key="2"
        >
          {!loading && completedEnrolledTips && (
            <TipsList
              resResolver={enrolledTipsResolver}
              searchbar={true}
              params={{ type: Types.Completed }}
              endpoint={endpoint}
              tips={completedEnrolledTips}
              meta={completedEnrolledMeta}
            />
          )}
        </TabPane>
      </Tabs>
    </div>
  );
}

export default MyEnrolledTips;
