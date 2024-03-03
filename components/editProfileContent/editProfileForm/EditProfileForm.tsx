import React from 'react';
import styles from './EditProfileForm.module.scss';
import { ProfileFormObj, ProfileObj } from '../../../api/profile/dataTypes';
import { Button, Form, Input, message, Select } from 'antd';
import SurveyLocation from '../../survey/surveyLocation/SurveyLocation';
import AddWork from '../addWork/AddWork';
import { EducationObj, WorkplaceObj } from '../../../api/authors/dataTypes';
import WorkList from '../workList/WorkList';
import EducationList from '../educationList/EducationList';
import AddEducation from '../addEducation/AddEducation';
import ProfileAPI from '../../../api/profile/request';
import EditProfilePic from '../editProfilePic/EditProfilePic';

/** NOTE: Location is not overriden with empty string
 * in case of empty string, location gets value from previous location
 */

interface EditProfileFormProps {
  profile: ProfileObj;
  onProfileChange: (requested: Partial<ProfileObj>) => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = (
  props: EditProfileFormProps
) => {
  const { profile, onProfileChange } = props;

  const [workplaces, setWorkplaces] = React.useState<WorkplaceObj[]>(
    profile?.workplaces || []
  );
  const [education, setEducation] = React.useState<EducationObj[]>(
    profile?.education || []
  );

  const [city, setCity] = React.useState<string>('');
  const [country, setCountry] = React.useState<string>('');

  const addWorkplace = (requested: WorkplaceObj) =>
    setWorkplaces([...workplaces, requested]);

  const addEducation = (requested: EducationObj) =>
    setEducation([...education, requested]);

  const removeWorkplace = (requested: number) => {
    const modifiedWorkplaces = [...workplaces];
    modifiedWorkplaces.splice(requested, 1);
    setWorkplaces(modifiedWorkplaces);
  };

  const removeEducation = (requested: number) => {
    const modifiedEducation = [...education];
    modifiedEducation.splice(requested, 1);
    setEducation(modifiedEducation);
  };

  const updateEducation = (requested: EducationObj, requestedIndex: number) => {
    const modifiedEducation = [...education].map((iter, index) =>
      index === requestedIndex ? requested : iter
    );
    setEducation(modifiedEducation);
  };

  const updateWorkplace = (requested: WorkplaceObj, requestedIndex: number) => {
    const modifiedWorkplaces = [...workplaces].map((iter, index) =>
      index === requestedIndex ? requested : iter
    );
    setWorkplaces(modifiedWorkplaces);
  };

  const onLocationChangeHandler = (
    requestedCity: string,
    requstedCountry: string
  ) => {
    setCity(requestedCity);
    setCountry(requstedCountry);
  };

  const onSubmit = async (values: Partial<ProfileFormObj>) => {
    try {
      const modifiedFormData = {
        name: values.name || profile?.name || '',
        city: city === '' ? profile?.city || '' : city,
        country: country === '' ? profile?.country || '' : country,
        workplaces: workplaces,
        education: education,
        gender: values.gender || profile?.gender || '',
        quote: values.quote || profile?.quote || '',
        about: values.about || profile?.about || '',
      };
      await new ProfileAPI().updateProfile(modifiedFormData);
      message.success('Saved');
      onProfileChange(modifiedFormData);
    } catch (Exception) {
      console.error(Exception);
      message.error('Failed');
    }
  };

  return (
    <div className={styles.container}>
      <Form
        onFinish={onSubmit}
        initialValues={{
          name: profile?.name || '',
          gender: profile?.gender || '',
          quote: profile?.quote || '',
          about: profile?.about || '',
        }}
      >
        <Form.Item className={styles.profile} label={<div>Avatar</div>}>
          <EditProfilePic
            avatar={profile?.avatar || ''}
            setAvatar={(requested: string) =>
              onProfileChange({ avatar: requested })
            }
            profile={profile}
          />
        </Form.Item>
        <Form.Item
          label={<div>Name</div>}
          name="name"
          rules={[{ required: true, message: 'Please input your username!' }]}
          tooltip={false}
        >
          <Input />
        </Form.Item>
        <Form.Item label={<div>location</div>}>
          <div className={styles.SurveyLocation}>
            <SurveyLocation
              country={profile?.country || ''}
              city={profile?.city || ''}
              onChangeHandler={onLocationChangeHandler}
              preventFocus={true}
            />
          </div>
        </Form.Item>
        <Form.Item label={<div>Gender</div>} name="gender">
          <Select>
            <Select.Option value="Male">Male</Select.Option>
            <Select.Option value="Female">Female</Select.Option>
            <Select.Option value="Others">Others</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label={<div>Work</div>} className={styles.label}>
          <div className={styles.list}>
            <WorkList
              updateWorkplace={updateWorkplace}
              workplaces={workplaces}
              removeWorkplace={removeWorkplace}
            />
            <AddWork onAdd={addWorkplace} />
          </div>
        </Form.Item>

        <Form.Item label={<div>Education</div>} className={styles.label}>
          <div className={styles.list}>
            <EducationList
              education={education}
              removeEducation={removeEducation}
              updateEducation={updateEducation}
            />
            <AddEducation onAdd={addEducation} />
          </div>
        </Form.Item>

        <Form.Item label={<div>Quote</div>} name="quote">
          <Input maxLength={100} />
        </Form.Item>
        <Form.Item label={<div>About Yourself</div>} name="about">
          <Input.TextArea maxLength={5000} />
        </Form.Item>
        <Form.Item className={styles['btn-container']}>
          <Button shape="round" type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditProfileForm;
