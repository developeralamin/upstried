import { Button, Divider, Select } from 'antd';
import lodash from 'lodash';
import React from 'react';
import { LanguageObj } from '../../../api/language/dataTypes';
import LanguageAPI from '../../../api/language/request';
import { ProfileObj } from '../../../api/profile/dataTypes';
import ProfileAPI from '../../../api/profile/request';
import PreferencesByInterest from '../preferenceByInterest/PreferencesByInterest';
import PreferencesByLang from '../preferenceByLang/PreferencesByLang';
import styles from './Preferences.module.scss';
import Timezone from '../timezonePreference/Timezone';

interface PreferencesProps {
  profile: ProfileObj;
  onProfileChange: (requested: Partial<ProfileObj>) => void;
}

const Preferences: React.FC<PreferencesProps> = (props: PreferencesProps) => {
  const { profile, onProfileChange } = props;
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [options, setOptions] = React.useState<LanguageObj[]>([]);
  const [value, setValue] = React.useState<string>(profile?.language);

  const { Option } = Select;

  React.useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await new LanguageAPI().get();
        // console.warn(response);
        setOptions(response);
      } catch (exception) {
        console.error(exception);
      }
    };
    fetchOptions();
  }, []);

  const onChange = (requested: string) => {
    setValue(requested);
  };

  const saveHandler = async () => {
    try {
      await new ProfileAPI().saveLanguage(value);
      onProfileChange({ language: value });
      setIsEdit(false);
    } catch (exception) {
      console.error(exception);
    }
  };

  const cancelHandler = () => {
    setIsEdit(false);
    setValue(profile.language);
  };

  return (
    <div>
      <div className={styles.header}>Site Preferences</div>
      <Divider className={styles.divider} />
      <PreferencesByLang
        onProfileChange={props.onProfileChange}
        profile={props.profile}
      />
      <PreferencesByInterest
        onProfileChange={props.onProfileChange}
        profile={props.profile}
      />
      <Timezone />
    </div>
  );
};

export default Preferences;
