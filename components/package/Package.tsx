import Link from 'next/link';
import Footer from '../footer/Footer';
import styles from '../package/Package.module.scss';

const Package = () => {
  return (
    <div className={styles.container}>
      <div className={styles.PackageHeadContent}>
        <h1>Plans</h1>
      </div>
      <div className={styles.PackageContent}>
        <p>
          Enjoy UpStride <img src="/books/win.png" /> Premium and start Building
          your Habits
        </p>
      </div>

      <div className={styles.PackageContainer}>
        <div className={styles.columns}>
          <ul className={styles.price}>
            <div className={styles.Plan}>
              <li className={styles.header}>Yearly Plan</li>
              <li className={styles.BestDeal}>
                {' '}
                <img src="/books/star.png" /> Best Deal
              </li>
            </div>
            <li className={styles.Dollar}>$39 yearly</li>
            <div className={styles.PriceData}>
              <li>
                <span className={styles.Icon}>
                  <img src="/books/check.png" />
                </span>{' '}
                100+ Books Summaries 
              </li>
              <li>
                <span className={styles.Icon}>
                  <img src="/books/check.png" />
                </span>{' '}
                Audiobooks
              </li>
              <li>
                <span className={styles.Icon}>
                  <img src="/books/check.png" />
                </span>{' '}
                Bite-size Actionable Tasks
              </li>
              <li>
                <span className={styles.Icon}>
                  <img src="/books/check.png" />
                </span>{' '}
                Interactive Habit Builder 
              </li>
              <li>
                <span className={styles.Icon}>
                  <img src="/books/check.png" />
                </span>{' '}
                iOS/Android App
              </li>
            </div>
            <Link href={`/payments/yearly`}>
              <button className={styles.BuyNowButton}>Buy Now</button>
            </Link>
          </ul>
        </div>
        <div className={styles.columns}>
          <ul className={styles.price}>
            <div className={styles.Plan}>
              <li className={styles.header}>Monthly Plan</li>

              <a href="#">upgrade your plan</a>
            </div>
            <li className={styles.Dollar}>$4 monthly</li>
            <div className={styles.PriceData}>
              <li>
                <span className={styles.Icon}>
                  <img src="/books/check.png" />
                </span>{' '}
                100+ Books Summaries 
              </li>
              <li>
                <span className={styles.Icon}>
                  <img src="/books/check.png" />
                </span>{' '}
                Audiobooks
              </li>
              <li>
                <span className={styles.Icon}>
                  <img src="/books/check.png" />
                </span>{' '}
                Bite-size Actionable Tasks
              </li>
              <li>
                <span className={styles.Icon}>
                  <img src="/books/check.png" />
                </span>{' '}
                Interactive Habit Builder 
              </li>
              <li>
                <span className={styles.Icon}>
                  <img src="/books/check.png" />
                </span>{' '}
                iOS/Android App
              </li>
            </div>
            <Link href={`/payments/monthly`}>
              <button className={styles.BuyNowButton}>Buy Now</button>
            </Link>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Package;
