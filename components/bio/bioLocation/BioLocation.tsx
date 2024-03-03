import React from 'react';
import styles from './BioLocation.module.scss';

export interface ProfileLocationsProps {
  address: any;
}

const ProfileLocations: React.SFC<ProfileLocationsProps> = (props) => {
  return (
    <div className={styles.BioLocation}>
      <h4 className="title">Location</h4>
      <p>{props.address}</p>
    </div>
  );
};
export default ProfileLocations;
