import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './BioEducation.module.scss';
export interface profileEdicationProps {
  education: any;
}

const profileEdication: React.SFC<profileEdicationProps> = (props) => {
  return (
    <div className={styles.BioEducation}>
      <h4 className="title">Education</h4>
      <ul>
        {props.education.map((education: any, index: number) => (
          <li key={index}>
            <FontAwesomeIcon icon={faGraduationCap} />{' '}
            <span>Studied at {education.institution}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default profileEdication;
