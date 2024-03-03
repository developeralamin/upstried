import styles from './Bio.module.scss';
import BioEducation from './bioEducation/BioEducation';
import BioLocation from './bioLocation/BioLocation';
import BioWork from './bioWork/BioWork';

export interface AuthorBioProps {
  profile: any;
}

const AuthorBio: React.SFC<AuthorBioProps> = (props) => {
  return (
    <div className={styles.Bio}>
      {props.profile.about ? (
        <>
          <h4 className="title">About</h4>
          <p className={styles.Description}>{props.profile.about}</p>
        </>
      ) : null}
      <BioWork workplaces={props.profile.workplaces} />
      <BioEducation education={props.profile.education} />
      <BioLocation address={props.profile.address} />
    </div>
  );
};

export default AuthorBio;
