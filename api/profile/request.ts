import {
  SERVER_ACCOUNT_AVATAR_CHANGE_ENDPOINT,
  SERVER_ACCOUNT_CREDENTIALS_CHANGE_ENDPOINT,
  SERVER_FILE_UPLOAD_ENDPOINT,
  SERVER_TIPS_USER_PROFILE_ENDPOINT,
  SERVER_USER_DEACTIVATE_ENDPOINT,
} from '../../config/endpoints';
import { getAuthToken, getAuthUser, getAuthUsername } from '../../services/authentication';
import { axioService, GET, POST } from '../../services/axiosService';
import { mapEducationToServer, mapWorkplaceToServer } from '../authors/mapper';
import {
  ProfileAccountObj,
  ProfileFormObj,
  ProfileObj,
  SocialObj,
} from './dataTypes';
import { mapProfileFromServer } from './mapper';

class ProfileAPI {
  get = async (): Promise<ProfileObj> => {
    const response = await axioService(
      GET,
      SERVER_TIPS_USER_PROFILE_ENDPOINT.replace(':username', getAuthUsername()),
      {},
      null
    );
    return mapProfileFromServer(response?.data?.data);
  };

  modifyAccount = async (accountObj: ProfileAccountObj): Promise<void> => {
    await axioService(
      POST,
      SERVER_ACCOUNT_CREDENTIALS_CHANGE_ENDPOINT,
      accountObj,
      getAuthToken()
    );
  };

  updateSocial = async (socialObj: SocialObj): Promise<void> => {
    await axioService(
      POST,
      SERVER_TIPS_USER_PROFILE_ENDPOINT.replace(':username', getAuthUsername()),
      { social_info: socialObj },
      getAuthToken()
    );
  };

  saveLanguage = async (requested: string): Promise<void> => {
    await axioService(
      POST,
      SERVER_TIPS_USER_PROFILE_ENDPOINT.replace(':username', getAuthUsername()),
      { preferred_lang: requested },
      getAuthToken()
    );
  };

  updateProfile = async (profileFormObj: ProfileFormObj): Promise<void> => {
    await axioService(
      POST,
      SERVER_TIPS_USER_PROFILE_ENDPOINT.replace(':username', getAuthUsername()),
      {
        ...profileFormObj,
        educations: profileFormObj.education.map((iter) =>
          mapEducationToServer(iter)
        ),
        workplaces: profileFormObj.workplaces.map((iter) =>
          mapWorkplaceToServer(iter)
        ),
      },
      getAuthToken()
    );
  };

  deactivateProfile = async (password: string): Promise<void> => {
    await axioService(
      POST,
      SERVER_USER_DEACTIVATE_ENDPOINT,
      { password },
      getAuthToken()
    );
  };

  changeAvatar = async (avatar: any): Promise<string> => {
    const formData = new FormData();
    formData.append('avatar', avatar);
    const response = await axioService(
      POST,
      SERVER_ACCOUNT_AVATAR_CHANGE_ENDPOINT,
      formData,
      getAuthToken()
    );
    return response?.data?.avatar || '';
  };

  removeAvatar = async (): Promise<string> => {
    const response = await axioService(
      POST,
      SERVER_ACCOUNT_AVATAR_CHANGE_ENDPOINT,
      { avatar: null },
      getAuthToken()
    );
    return response?.data?.avatar || '';
  };

  changeCover = async (cover: string): Promise<void> => {
    await axioService(
      POST,
      SERVER_TIPS_USER_PROFILE_ENDPOINT.replace(':username', getAuthUsername()),
      { cover_photo: cover },
      getAuthToken()
    );
  };

  getCover = async (userName: string): Promise<string> => {
    const response = await axioService(
      GET,
      SERVER_TIPS_USER_PROFILE_ENDPOINT.replace(':username', userName),
      {},
      getAuthToken()
    );
    return response?.data?.data?.cover_photo || '';
  };

  uploadCoverFile = async (cover: any) => {
    const formData = new FormData();
    formData.append('attachment', cover);
    formData.append('privacy', 'public');

    const response = await axioService(
      POST,
      SERVER_FILE_UPLOAD_ENDPOINT,
      formData,
      getAuthToken()
    );

    return response?.data?.url || '';
  };
}

export class ServerProfileAPI {
  get = async (request: unknown): Promise<ProfileObj> => {
    const response = await axioService(
      GET,
      SERVER_TIPS_USER_PROFILE_ENDPOINT.replace(':username', getAuthUsername(request)),
      {},
      null
    );
    return mapProfileFromServer(response?.data?.data);
  };
}

export default ProfileAPI;
