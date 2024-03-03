import { faUndoAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Select, Tooltip } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ServerAuthorsAPI from '../../api/authors/request';
import styles from './Filter.module.scss';
const { Option } = Select;

const AdvancedFilters: React.FC = () => {
  const router = useRouter();
  const [authors, setAuthors] = useState<any>([]);
  const [tag, setTag] = useState<string | undefined>(undefined);
  const [author, setAuthor] = useState<string | undefined>(undefined);
  const [sortBy, setSortBy] = useState<string | undefined>(undefined);
  const onTagChange = (tags: any) => {
    const value = tags.join(',');
    const { pathname } = router;
    const query = { ...router.query, tags: value };
    setTag(tags);
    router.push({ pathname, query });
  };

  const getAuthors = async (q: any = '') => {
    const responseAuthors = await ServerAuthorsAPI.all({ q });
    if (responseAuthors?.status === 200) {
      setAuthors(responseAuthors.data);
    }
  };

  const onAuthorChange = (author: string) => {
    const { pathname } = router;
    const query = { ...router.query, author };
    setAuthor(author);
    router.push({ pathname, query });
  };

  const isAuthorEnabled = router.route === '/authors';
  useEffect(() => {
    if (isAuthorEnabled) {
      getAuthors();
    }
    const initialAuthor: any = router.query.author || undefined;
    const initialTags: any = router.query.tags || undefined;
    const initialSortBy: any =
      router.query.preference &&
      (router.query.preference === 'recent' ||
        router.query.preference === 'popular')
        ? router.query.preference
        : undefined;
    setAuthor(initialAuthor);
    setTag(initialTags);
    setSortBy(initialSortBy);
  }, [router]);

  const searchAuthor = (q: string) => {
    setTimeout(() => {
      getAuthors(q);
    }, 500);
  };

  const onSortbyChange = (sortBy: string) => {
    const { pathname } = router;
    const query = { ...router.query, preference: sortBy };
    setSortBy(sortBy);
    router.push({ pathname, query });
  };

  const resetAll = () => {
    setTag(undefined);
    setAuthor(undefined);
    setSortBy(undefined);
    const { pathname } = router;
    const query = { ...router.query };
    delete query.preference;
    delete query.tags;
    delete query.author;
    router.push({ pathname, query });
  };
  return (
    <>
      <div className={styles.Filters}>
        <div className={styles.FiltersContainer}>
          <div className={styles.FilterItem}>
            <Select
              className={styles.InputTags}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              value={tag}
              style={{ width: 200 }}
              mode="tags"
              placeholder="Search by tag"
              onChange={onTagChange}
              dropdownClassName="input-tags"
            />
          </div>
          {!isAuthorEnabled ? (
            <div className={styles.FilterItem}>
              <Select
                onSearch={searchAuthor}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                value={author}
                defaultOpen={false}
                showSearch
                allowClear
                style={{ width: 200 }}
                placeholder="Search by author"
                onChange={onAuthorChange}
                dropdownClassName="dropdown-style2 filter-author"
              >
                {authors.length > 0
                  ? authors.map((author: any, index: number) => (
                      <Option key={index} value={author.username}>
                        {author.name}
                      </Option>
                    ))
                  : null}
              </Select>
            </div>
          ) : null}
          <div className={styles.FilterItem}>
            <Select
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              value={sortBy}
              style={{ width: 200 }}
              placeholder="Sort by"
              onChange={onSortbyChange}
            >
              <Option value="popular">Popular</Option>
              <Option value="recent">Recent</Option>
            </Select>
          </div>
        </div>
        <div className={styles.FilterResetItem}>
          <Tooltip title="Reset">
            <Button className={styles.FilterReset} onClick={resetAll}>
              <FontAwesomeIcon icon={faUndoAlt} />
            </Button>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default AdvancedFilters;
