import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from 'antd';
import { useRouter } from 'next/dist/client/router';
import React, { useRef, useState } from 'react';
import ServerAuthorsAPI from '../../api/authors/request';
import styles from './AuthorSearch.module.scss';

export interface AuthorSearchProps {
  onSearch: any;
  username: string;
  onSearchLoading?: (loading: boolean) => void;
  authorType: string;
  loading: (loading: boolean) => void;
}

const AuthorSearch: React.FC<AuthorSearchProps> = (props) => {
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

  const searchAuthorFollowings = (ev: any) => {
    if (props.onSearchLoading) {
      props.onSearchLoading(true);
    }
    const query = ev.target.value;
    const request: any = {};
    clearTimeout(timer);
    props.loading(true);
    setTimer(
      setTimeout(() => {
        request['username'] = props.username;
        request['q'] = query;
        ServerAuthorsAPI.getAuthorFollowings({
          ...request,
        }).then((authorResponse: any) => {
          if (authorResponse.status === 200) {
            props.onSearch(authorResponse);
          }
          if (props.onSearchLoading) {
            props.onSearchLoading(false);
          }
          props.loading(false);
        });
      }, 1000)
    );
  };

  const searchAuthorFollowers = (ev: any) => {
    if (props.onSearchLoading) {
      props.onSearchLoading(true);
    }
    const query = ev.target.value;
    const request: any = {};
    clearTimeout(timer);
    props.loading(true);
    setTimer(
      setTimeout(() => {
        request['username'] = props.username;
        request['q'] = query;
        ServerAuthorsAPI.getAuthorFollowers({
          ...request,
        }).then((authorResponse: any) => {
          if (authorResponse.status === 200) {
            props.onSearch(authorResponse);
          }
          if (props.onSearchLoading) {
            props.onSearchLoading(false);
          }
        });
      }, 1000)
    );
  };
  const onSearch = (ev: any) => {
    switch (props.authorType) {
      case 'authorFollowings':
        searchAuthorFollowings(ev);
        break;
      case 'authorFollowers':
        searchAuthorFollowers(ev);
        break;

      default:
        searchAuthorFollowings(ev);
        break;
    }
  };
  return (
    <div
      className={styles.AuthorSearch + (onFocused ? ' ' + styles.Focused : '')}
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

export default AuthorSearch;
