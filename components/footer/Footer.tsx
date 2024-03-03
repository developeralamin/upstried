import {
  GoogleOutlined,
  TwitterOutlined,
  WhatsAppOutlined,
  createFromIconfontCN,
} from '@ant-design/icons';
import styles from '../singleTips/SingleTips.module.scss';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

const Footer = () => {
  return (
    <div>
      <div className={styles.MainNewsLetter}>
        <div className={styles.NewsLetterContent}>
          <h2>Sign up our newsletter</h2>
          <p> Lorem ipsum dolor sit. Lorem ipsum dolor sit. </p>
        </div>
        <div className={styles.InputField}>
          <input type="text" placeholder="Enter your Email address" />
          <button className={styles.SubscribeBtn}>Subscribe Now</button>
        </div>
        {/* icon */}
        <div className={styles.NewsLetterIcon}>
          <div className={styles.SingleNewsIcon}>
            <span>
              <IconFont type="icon-facebook" />
            </span>
          </div>
          <div className={styles.SingleNewsIcon}>
            <span>
              <WhatsAppOutlined />
            </span>
          </div>
          <div className={styles.SingleNewsIcon}>
            <span>
              <TwitterOutlined />
            </span>
          </div>
          <div className={styles.SingleNewsIcon}>
            <span>
              <GoogleOutlined />
            </span>
          </div>
        </div>
      </div>
      <div className={styles.FooterArea}>
        <div className={styles.containerFooter}>
          <p>Copyright & 2024 Upstride . All Rights Reserved</p>
          <p>Privacy Policy | Terms & Conditions</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
