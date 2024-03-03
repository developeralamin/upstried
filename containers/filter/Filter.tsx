import { Select, Tooltip } from 'antd';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import CategoryDropdown from '../../components/categoryDropdown/CategoryDropdown';
import { AUTHORS_ROUTE, HOME_ROUTE } from '../../config/endpoints';
import CategoryInterface from '../../interfaces/category.interface';
import { isAuthenticated } from '../../services/authentication';
import AdvancedFilters from './AdvancedFilters';
import styles from './Filter.module.scss';
import FilterLoader from './FilterLoader';

const Filter: React.FC = () => {
  const [enableFilter, setEnableFilter] = useState(false);
  const [initialPreference, setInitialPreference] = useState<any>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    setInitialPreference(router.query.preference);
    if (router.query.preference) {
      const element = document?.querySelector('#content-filter');
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [router]);
  useLayoutEffect(() => {
    setTimeout(() => {
      setPageLoading(false);
    }, 500);
  }, []);

  const onPreferenceChangeHandler = (value: string) => {
    if (
      router.pathname === '/category/[category]/books' &&
      value === 'my-interest'
    ) {
      const queryObj = { preference: value };
      router.push({ pathname: '/', query: queryObj });
      return;
    }
    const { pathname } = router;
    const query: any = { ...router.query, preference: value };

    if (value === 'All') {
      router.push(pathname, undefined, { shallow: true });
      return;
    }
    router.push(
      { pathname, query },
      `${pathname}?${new URLSearchParams(query)}`,
      { shallow: true }
    );
  };
  const onChangeContentType = (type: string) => {
    if (type === 'tips') {
      router.push(HOME_ROUTE);
      return;
    }
    router.push(AUTHORS_ROUTE);
  };

  const onCategorySelect = (category: CategoryInterface) => {
    if (category.name === 'All') {
      const query = { ...router.query };
      delete query.category;
      let qParams: any = '';
      if (router.query.preference) {
        qParams += `preference=${router.query.preference}`;
      }
      if (router.query.tags) {
        if (qParams) {
          qParams += '&';
        }
        qParams += `tags=${router.query.tags}`;
      }
      if (
        router.pathname === '/category/[category]/books' ||
        router.pathname === '/'
      ) {
        window.location.href = qParams ? `/?${qParams}` : `/`;
        return;
      }
      window.location.href = qParams
        ? `/authors?${qParams}`
        : `/authors${qParams}`;
      return;
    }
    const pathname =
      router.pathname === '/category/[category]/books' ||
      router.pathname === '/'
        ? `/category/${category.name}/books`
        : `/category/${category.name}/authors`;
    const query = { ...router.query };
    delete query.category;
    router.push({ pathname, query });
  };
  const isMyInterestEnabled =
    router.route === '/books' ||
    router.route === '/' ||
    router.route === '/category/[category]/books'
      ? true
      : false;
  const isRecentEnabled =
    router.route === '/books' ||
    router.route === '/' ||
    router.route === '/category/[category]/books'
      ? true
      : false;

  const AllPrefValues = [undefined, null, 'All'];
  return (
    <>
      {!pageLoading ? (
        <div className={styles.Filter} id="content-filter">
          <div className={styles.Container}>
            <div className={styles.Start}>
              <Select
                className={styles.ContentTypeSelector}
                defaultValue={router.route === '/authors' ? 'people' : 'tips'}
                style={{ width: 120 }}
                onChange={onChangeContentType}
              >
                <Select.Option value="tips">Books</Select.Option>
                <Select.Option value="people">Authors</Select.Option>
              </Select>
            </div>
            {/* mobile section */}
            <div className={styles.MobileCategoryBtn}>
              <CategoryDropdown onCategorySelect={onCategorySelect} />
            </div>

            {/*   <div className={styles.MobileFilterBtn}>
              <Tooltip title="Search by">
                <button
                  className={styles.FilterBtn}
                  onClick={() =>
                    !enableFilter
                      ? setEnableFilter(true)
                      : setEnableFilter(false)
                  }
                >
                  <img
                    src="/filter/filter.svg"
                    width="15"
                    height="15"
                    alt="Filter"
                  />
                  <span>Filter</span>
                </button>
              </Tooltip>
            </div> */}
            {/* end mobile section */}
            <div className={styles.Middle}>
              <ul className={styles.Menu}>
                <li
                  className={
                    AllPrefValues.includes(initialPreference)
                      ? styles.Active
                      : ''
                  }
                >
                  <button onClick={() => onPreferenceChangeHandler('All')}>
                    All
                  </button>
                </li>
                {isAuthenticated() && isMyInterestEnabled ? (
                  <li
                    className={
                      initialPreference === 'my-interest' ? styles.Active : ''
                    }
                  >
                    <button
                      onClick={() => onPreferenceChangeHandler('my-interest')}
                    >
                      My Interest
                    </button>
                  </li>
                ) : null}
                <li
                  className={
                    initialPreference === 'popular' ? styles.Active : ''
                  }
                >
                  <button onClick={() => onPreferenceChangeHandler('popular')}>
                    Popular
                  </button>
                </li>
                <li
                  className={
                    initialPreference === 'trending' ? styles.Active : ''
                  }
                >
                  <button onClick={() => onPreferenceChangeHandler('trending')}>
                    Trending
                  </button>
                </li>
                {isRecentEnabled ? (
                  <li
                    className={
                      initialPreference === 'recent' ? styles.Active : ''
                    }
                  >
                    <button
                      className={
                        initialPreference === 'recent' ? styles.Active : ''
                      }
                      onClick={() => onPreferenceChangeHandler('recent')}
                    >
                      Recent
                    </button>
                  </li>
                ) : null}
              </ul>
            </div>
            <div className={styles.End}>
              <CategoryDropdown onCategorySelect={onCategorySelect} />
              {/* <Tooltip title="Search by">
                <button
                  className={styles.FilterBtn}
                  onClick={() =>
                    !enableFilter
                      ? setEnableFilter(true)
                      : setEnableFilter(false)
                  }
                >
                  <img
                    src="/filter/filter.svg"
                    width="15"
                    height="15"
                    alt="Filter"
                  />
                  <span>Filter</span>
                </button>
              </Tooltip> */}
            </div>
          </div>
          <div className={styles.MobileMenuItems}>
            <ul className={styles.Menu}>
              <li
                className={
                  AllPrefValues.includes(initialPreference) ? styles.Active : ''
                }
              >
                <button onClick={() => onPreferenceChangeHandler('All')}>
                  All
                </button>
              </li>
              {isAuthenticated() && isMyInterestEnabled ? (
                <li
                  className={
                    initialPreference === 'my-interest' ? styles.Active : ''
                  }
                >
                  <button
                    onClick={() => onPreferenceChangeHandler('my-interest')}
                  >
                    My Interest
                  </button>
                </li>
              ) : null}
              <li
                className={initialPreference === 'popular' ? styles.Active : ''}
              >
                <button onClick={() => onPreferenceChangeHandler('popular')}>
                  Popular
                </button>
              </li>
              <li
                className={
                  initialPreference === 'trending' ? styles.Active : ''
                }
              >
                <button onClick={() => onPreferenceChangeHandler('trending')}>
                  Trending
                </button>
              </li>
              {isRecentEnabled ? (
                <li
                  className={
                    initialPreference === 'recent' ? styles.Active : ''
                  }
                >
                  <button
                    className={
                      initialPreference === 'recent' ? styles.Active : ''
                    }
                    onClick={() => onPreferenceChangeHandler('recent')}
                  >
                    Recent
                  </button>
                </li>
              ) : null}
            </ul>
          </div>
          {enableFilter ? <AdvancedFilters /> : ''}
        </div>
      ) : (
        <FilterLoader />
      )}
    </>
  );
};

export default Filter;
