import { Button, message, Tabs } from 'antd';
import React from 'react';
import styles from './SurveyForm.module.scss';
import SurveyGender from '../surveyGender/SurveyGender';
import SurveyLocation from '../surveyLocation/SurveyLocation';
import SurveyCategories from '../surveyCategories/SurveyCategories';
import { SurveyObj } from '../../../api/survey/dataTypes';
import { SurveyAPI } from '../../../api/survey/request';
import clsx from 'clsx';
import SurveyWelcome from '../surveyWelcome/SurveyWelcome';
import SurveyComplete from '../surveyComplete/SurveyComplete';

interface SurveyFormProps {
  postSubmitHandler: () => void;
}

const INITIAL_SURVEY_DATA: SurveyObj = {
  gender: '',
  country: '',
  city: '',
  interests: [],
};

const SurveyForm: React.FC<SurveyFormProps> = (props: SurveyFormProps) => {
  const { TabPane } = Tabs;
  const { postSubmitHandler } = props;

  /** states */

  const [active, setActive] = React.useState<string>('1');
  const [surveyData, setSurveyData] =
    React.useState<SurveyObj>(INITIAL_SURVEY_DATA);

  /** handlers */

  const navigateToSecond = () => setActive('2');
  const navigateToThird = () => {
    setActive('3');
  };
  const navigateToFourth = () => {
    setActive('4');
  };
  const navigateToFifth = () => {
    setActive('5');
  };

  const onSubmit = () => {
    try {
      new SurveyAPI().post(surveyData);
      navigateToFifth();
    } catch (exception) {
      message.error('Request Failed !');
    }
  };

  const onGenderChange = (requested: string) =>
    setSurveyData({ ...surveyData, gender: requested });

  const onLocationChange = (city: string, country: string) =>
    setSurveyData({ ...surveyData, city, country });

  const onInterestChange = (requested: string[]) => {
    setSurveyData({ ...surveyData, interests: requested });
  };

  const renderTabBar = (tabBarProps: any) => {
    const tabKeys = ['1', '2', '3', '4', '5'];
    return (
      <div className={styles['tab-header']}>
        {tabKeys.map((iter: string, index: number) => (
          <div
            key={'tab-header-' + index}
            className={clsx({
              [styles['tab-dot']]: true,
              [styles['tab-active-dot']]: iter <= tabBarProps?.activeKey,
            })}
          ></div>
        ))}
      </div>
    );
  };

  return (
    <Tabs activeKey={active} centered renderTabBar={renderTabBar}>
      <TabPane tab="Tab" key="1">
        <SurveyWelcome />
        <Button
          className={styles.button}
          type="primary"
          onClick={navigateToSecond}
        >
          Next
        </Button>
      </TabPane>
      <TabPane tab="Tab" key="2">
        <h2 className={styles.title}>Select your Gender</h2>
        <div className={styles.content}>
          <SurveyGender
            value={surveyData.gender}
            onChangeHandler={onGenderChange}
          />
        </div>
        <Button
          className={styles.button}
          type="primary"
          onClick={navigateToThird}
          disabled={surveyData.gender === ''}
        >
          Next
        </Button>
      </TabPane>
      <TabPane tab="Tab" key="3">
        <h2 className={styles.title}>Choose your region</h2>
        <div className={styles.content}>
          <SurveyLocation
            city={surveyData.city}
            country={surveyData.country}
            required={true}
            onChangeHandler={onLocationChange}
          />
        </div>
        <Button
          className={styles.button}
          type="primary"
          onClick={navigateToFourth}
          disabled={surveyData.city === '' || surveyData.country === ''}
        >
          Next
        </Button>
      </TabPane>
      <TabPane tab="Tab" key="4">
        <h2 className={styles.title}>Tell us about your interests</h2>
        <SurveyCategories
          categories={surveyData.interests}
          onChangeHandler={onInterestChange}
        />
        <Button
          className={styles.button}
          type="primary"
          onClick={onSubmit}
          disabled={surveyData.interests.length < 3}
        >
          {surveyData.interests.length < 3
            ? surveyData.interests.length === 0
              ? 'Pick minimun 3'
              : `Pick ${3 - surveyData.interests.length} more`
            : `Next`}
        </Button>
      </TabPane>
      <TabPane tab="Tab" key="5">
        <SurveyComplete />
        <Button
          className={styles.button}
          type="primary"
          onClick={postSubmitHandler}
        >
          Done
        </Button>
      </TabPane>
    </Tabs>
  );
};

export default SurveyForm;
