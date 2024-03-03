import { Avatar } from 'antd';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import styles from './SearchResultAuthors.module.scss';
export interface SearchResultAuthorsProps {
  authors: any;
  query: string;
}

const SearchResultAuthors: React.SFC<SearchResultAuthorsProps> = (props) => {
  const router = useRouter();
  const seeAllAuthors = () => {
    router.push({
      pathname: '/authors',
      query: {
        q: props.query,
      },
    });
  };
  const goToAuthor = (author: any) => {
    window.location.href = `/authors/${author.username}`;
  };
  return (
    <div className={styles.SearchResultAuthors}>
      <h5 className={styles.Title}>Authors</h5>
      <ul className={styles.ItemList}>
        {props.authors.map((author: any, index: number) => (
          <li className={styles.Item} key={index}>
            <div onClick={() => goToAuthor(author)}>
              {author.avatar ? (
                <Avatar src={author.avatar} />
              ) : // <Image
              //   src={author.avatar}
              //   width="37"
              //   height="37"
              //   alt="avatar"
              // />
              null}
              <h5 className={styles.Name}>{author.name}</h5>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.All} onClick={seeAllAuthors}>
        See all Authors
      </div>
    </div>
  );
};

export default SearchResultAuthors;
