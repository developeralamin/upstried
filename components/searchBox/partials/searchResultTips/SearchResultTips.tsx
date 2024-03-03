import { useRouter } from 'next/dist/client/router';
import styles from './SearchResultTips.module.scss';
import Link from 'next/link';
export interface SearchResultTipsProps {
  tips: any;
  query: string;
}

const SearchResultTips: React.SFC<SearchResultTipsProps> = (props) => {
  const router = useRouter();
  const seeAllTips = () => {
    router.push({
      pathname: '/',
      query: {
        q: props.query,
      },
    });
  };
  const goToTips = (tipInfo: any) => {
    window.location.href = tipInfo.detailsUrl;
  };
  // onClick={() => goToTips(tipInfo)}
  return (
    <div className={styles.SearchResultTips}>
      <h5 className={styles.Title}>Tips</h5>
      <ul className={styles.ItemList}>
        {props.tips.map((tipInfo: any, index: number) => (
          <li className={styles.Item} key={index}>
            <Link href={tipInfo.detailsUrl}>
              <a>
                <div>
                  {tipInfo.thumbnail ? (
                    <img
                      src={tipInfo.thumbnail}
                      width="37"
                      height="37"
                      alt="avatar"
                    />
                  ) : null}
                  <h5 className={styles.Name}>{tipInfo.title}</h5>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles.All} onClick={seeAllTips}>
        See all Tips
      </div>
    </div>
  );
};

export default SearchResultTips;
