import { Button, Divider, Select } from 'antd';
import lodash from 'lodash';
import React from 'react';
import { LanguageObj } from '../../../api/language/dataTypes';
import LanguageAPI from '../../../api/language/request';
import { ProfileObj } from '../../../api/profile/dataTypes';
import ProfileAPI from '../../../api/profile/request';
import styles from './PreferencesByLang.module.scss';

interface PreferencesByLangProps {
  profile: ProfileObj;
  onProfileChange: (requested: Partial<ProfileObj>) => void;
}

const PreferencesByLang: React.FC<PreferencesByLangProps> = (
  props: PreferencesByLangProps
) => {
  const { profile, onProfileChange } = props;
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [options, setOptions] = React.useState<LanguageObj[]>([]);
  const [value, setValue] = React.useState<string>(profile?.language);

  const { Option } = Select;

  React.useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await new LanguageAPI().get();
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
      {!isEdit ? (
        <div className={styles.container}>
          <div>
            <div className={styles.subheader}>Tips Preferred by language</div>
            <div className={styles.paragraph}>
              Current:{' '}
              {lodash.find(options, { langCode: profile.language })?.country ||
                ''}{' '}
              {profile.language ? (
                <>
                  (
                  {lodash.find(options, { langCode: profile.language })
                    ?.language || ''}
                  )
                </>
              ) : (
                'Default'
              )}
            </div>
          </div>
          <div>
            <Button
              className={styles.cancel}
              type="text"
              onClick={() => setIsEdit(true)}
            >
              Change
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div className={styles.subheader}>Tips preferred by language</div>
          <div className={styles.paragraph}>
            Select your preferrable language based on which tips will be
            displayed on your feed
          </div>
          <div className={styles['btn-container']}>
            <Select
              size="small"
              className={styles.select}
              value={value}
              onChange={onChange}
            >
              {options.map((iter: LanguageObj, index: number) => (
                <Option key={`option_` + index} value={iter.langCode}>
                  {iter.country} ({iter.language})
                </Option>
              ))}
            </Select>

            <Button
              type="primary"
              className={styles.save}
              onClick={saveHandler}
            >
              Save Changes
            </Button>
            <Button
              className={styles.cancel}
              type="text"
              onClick={cancelHandler}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreferencesByLang;
