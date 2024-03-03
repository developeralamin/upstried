import { Select } from 'antd';
const { Option } = Select;
import styles from './Timezone.module.scss';
import TimezoneAPI from '../../../api/timezone/request';
import { useEffect, useState } from 'react';
export const Timezone = () => {
  const [timezoneList, setTimezoneList] = useState([]);
  const [timezone, setTimezone] = useState('Default');
  const [timezoneValue, setTimezoneValue] = useState('');
  useEffect(() => {
    TimezoneAPI.getTimezone().then((res) => {
      // console.log(res);
      setTimezoneList(res);
    });

    TimezoneAPI.getSettings().then((res) => {
      setTimezoneValue(res.general.timezone);
    });
  }, []);

  useEffect(() => {
    if (timezoneList.length === 0 || timezoneValue === '') {
      return;
    }
    timezoneList.forEach((timezone: any, i) => {
      if (timezone.value === timezoneValue) {
        setTimezone(timezone.name);
      }
    });
  }, [timezoneList, timezoneValue]);

  function handleChange(value: any) {
    // console.log(`selected ${value}`);
    setTimezoneValue(value);
    TimezoneAPI.setTimezone(value)
      .then((res) => {
        console.warn(res);
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  return (
    <div className={styles.Container}>
      <div className={styles.OptionContext}>
        <p className={styles.Preference}>Select your time zone</p>
        <p className={styles.Description}>Pick your preferred time zone</p>
      </div>
      <div>
        <Select
          showSearch
          defaultValue={timezone}
          value={timezone}
          onChange={handleChange}
          style={{ minWidth: '230px' }}
        >
          {timezoneList.map((timezone: any, index) => {
            return (
              <Option key={timezone.name} value={timezone.value}>
                {timezone.name}
              </Option>
            );
          })}
        </Select>
      </div>
    </div>
  );
};

export default Timezone;
