import React from 'react';
import styles from './SearchResult.module.scss';
import SearchResultAuthor from '../searchResultAuthors/SearchResultAuthors';
import SearchResultTips from '../searchResultTips/SearchResultTips';
import { Empty } from 'antd';

export interface SearchResultProps {
  tips: any;
  authors: any;
  query: string;
}

const SearchResult: React.FC<SearchResultProps> = (props) => {
  return (
    <div className={styles.SearchResult}>
      {props.tips?.length > 0 ? (
        <SearchResultTips query={props.query} tips={props.tips} />
      ) : null}
      {props.authors?.length > 0 ? (
        <SearchResultAuthor query={props.query} authors={props.authors} />
      ) : null}
      {props.tips?.length < 1 && props.authors?.length < 1 ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : null}
    </div>
  );
};

export default SearchResult;
