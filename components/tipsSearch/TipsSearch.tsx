import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from 'antd';
import { useRouter } from 'next/dist/client/router';
import React, { useRef, useState } from 'react';
import TipsAPI from '../../api/books/request';
import styles from './TipsSearch.module.scss';

export interface TipsSearchProps {
  onSearch: any;
  onSearchLoading: (loading: boolean) => void;
  endpoint?: string;
}

const TipsSearch: React.FC<TipsSearchProps> = (props) => {
  const searchBoxRef = useRef(null) as any;
  const [placeholder, setPlaceholder] = useState('Search ...');
  const [timer, setTimer] = useState<any>(null);
  const [onFocused, setOnFocused] = useState(false);
  const router = useRouter();

  const onFocusHandler = () => {
    setPlaceholder('');
    setOnFocused(true);
  };

  const onBlurHandler = () => {
    setOnFocused(false);
    setPlaceholder('Search ...');
  };

  const onSearch = (ev: any) => {
    const query = ev.target.value;
    clearTimeout(timer);
    setTimer(
      setTimeout(async () => {
        try {
          const response = await TipsAPI.fetchTips({
            q: query,
            endpoint: props.endpoint,
          });
          props.onSearch({
            data: response.data,
            meta: response.meta,
            query,
          });
          props.onSearchLoading(false);
        } catch (error) {
          props.onSearch({
            data: [],
            meta: null,
            query,
          });
          props.onSearchLoading(false);
        }
      }, 1000)
    );
  };
  return (
    <div
      className={styles.TipsSearch + (onFocused ? ' ' + styles.Focused : '')}
      ref={searchBoxRef}
    >
      <Input
        onBlur={onBlurHandler}
        onFocus={onFocusHandler}
        defaultValue={router.query.q ?? ''}
        onKeyUpCapture={onSearch}
        size="large"
        placeholder={placeholder}
        prefix={<FontAwesomeIcon icon={faSearch} />}
      />
    </div>
  );
};

export default TipsSearch;
