import { faSuitcase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './BioWork.module.scss';

export interface ProfileWorksProps {
  workplaces: any;
}

const ProfileWorks: React.SFC<ProfileWorksProps> = (props) => {
  return (
    <div className={styles.BioWork}>
      <h4 className="title">Work</h4>
      <ul>
        {props.workplaces?.map((work: any, index: number) => (
          <li key={index}>
            <FontAwesomeIcon icon={faSuitcase} />{' '}
            <span>
              {work.position} at {work.workplace}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileWorks;
