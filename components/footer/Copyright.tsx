import styles from '../singleTips/SingleTips.module.scss';

const CopyRight = () => {
  return (
    <div className={styles.CopyRightArea}>
      <div className={styles.containerFooter}>
        <p>Copyright & 2024 Upstride . All Rights Reserved</p>
        <p>Privacy Policy | Terms & Conditions</p>
      </div>
    </div>
  );
};

export default CopyRight;
