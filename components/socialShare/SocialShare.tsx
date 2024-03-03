import { faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown, Menu, Tooltip } from 'antd';
import React from 'react';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';
import styles from './SocialShare.module.scss';
import { SocialShareProps } from './SocialShare.d';

const SocialShare: React.FC<SocialShareProps> = (props) => {
  function copyLink() {
    navigator.clipboard.writeText(detailsLink);
  }

  const { toolTipVisible, setToolTipVisible, title, detailsLink } = props;

  const dropdownMenu = (
    <Menu>
      <h5 className="title">Social Share</h5>
      <Menu.Item>
        <FacebookShareButton url={detailsLink} hashtag="test">
          <FacebookIcon size="30" round={true} />
          <span>Facebook</span>
        </FacebookShareButton>
      </Menu.Item>
      <Menu.Item>
        <TwitterShareButton
          title={title}
          url={detailsLink}
        >
          <TwitterIcon size="30" round={true} />
          <span>Twitter</span>
        </TwitterShareButton>
      </Menu.Item>
      <Menu.Item>
        <LinkedinShareButton url={detailsLink}>
          <LinkedinIcon size="30" round={true} />
          <span>Linkedin</span>
        </LinkedinShareButton>
      </Menu.Item>
      <Menu.Item>
        <button onClick={copyLink}>
          <img src="/tips/icon/copy.png" alt="Icon" />
          <span>Copy Link</span>
        </button>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <div className={styles.SocialShare}>
        <Dropdown
          placement="topLeft"
          overlay={dropdownMenu}
          trigger={['click']}
          overlayClassName="social-share"
          onVisibleChange={() => {
            setToolTipVisible(!toolTipVisible);
          }}
        >
          <Tooltip title={toolTipVisible ? 'Share' : ''}>
            <button className={styles.Toggler}>
              <i className="icon-Union-4"></i>
              <span className="label">Share</span>
            </button>
          </Tooltip>
        </Dropdown>
      </div>
    </>
  );
};

export default SocialShare;
