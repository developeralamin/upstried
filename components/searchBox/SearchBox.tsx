import { Input } from 'antd';
import lodash from 'lodash';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useRef, useState } from 'react';
import ServerAuthorsAPI from '../../api/authors/request';
import TipsAPI from '../../api/books/request';
import SearchLoader from './partials/searchLoader/SearchLoader';
import SearchResult from './partials/searchResult/SearchResult';
import styles from './SearchBox.module.scss';
import eventHandler from '../../services/analytics';

const SearchBox: React.FC = () => {
  const searchBoxRef = useRef(null) as any;
  const [loading, setLoading] = useState(false);
  const [tips, setTips] = useState<any>([]);
  const [placeholder, setPlaceholder] = useState('Search ...');
  const [onFocused, setOnFocused] = useState(false);
  const [authors, setAuthors] = useState<any>([]);
  const [searchBoxActive, setSearchBoxActive] = useState(false);
  const [timer, setTimer] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    setSearchBoxActive(false);
  }, [searchBoxRef, router]);

  const handleClickOutside = (ev: any) => {
    if (
      searchBoxRef &&
      searchBoxRef.current &&
      !searchBoxRef.current.contains(ev.target)
    ) {
      setSearchBoxActive(false);
    }
  };

  const onFocusHandler = () => {
    setPlaceholder('');
    setOnFocused(true);
  };

  const onBlurHandler = () => {
    setOnFocused(false);
    setPlaceholder('Search ...');
  };

  const onSearch = (ev: any) => {
    setLoading(true);
    const query = ev.target.value;
    if (query.length > 0) {
      setSearchBoxActive(true);
      setSearchQuery(query);
    }
    clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        ServerAuthorsAPI.all({
          q: query,
        }).then((AuhtorResponse: any) => {
          if (AuhtorResponse.status === 200) {
            const authors = lodash.take(AuhtorResponse.data, 3);
            setAuthors(authors);
            TipsAPI.all({
              q: query,
            }).then((tipsResponse: any) => {
              if (tipsResponse.status === 200) {
                const tips = lodash.take(tipsResponse.data, 3);
                setTips(tips);
              }
              setLoading(false);
            });
          }
        });
      }, 500)
    );
  };
  const onPressEnterHandler = (ev: any) => {
    const params: any = { q: ev.target.value };
    router.push({ pathname: router.route, query: params });
  };
  return (
    <div
      className={styles.SearchBox + (onFocused ? ' ' + styles.Focused : '')}
      ref={searchBoxRef}
    >
      <Input
        onBlur={onBlurHandler}
        onFocus={onFocusHandler}
        defaultValue={router.query.q ?? ''}
        onPressEnter={onPressEnterHandler}
        onKeyUpCapture={onSearch}
        size="large"
        placeholder={placeholder}
        prefix={<i className="icon-Union"></i>}
      />
      {searchBoxActive ? (
        <div className={styles.SearchResultContainer}>
          {!loading ? (
            <SearchResult query={searchQuery} authors={authors} tips={tips} />
          ) : (
            <SearchLoader />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default SearchBox;
