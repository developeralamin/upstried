import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SERVER_USER_PROFILE_ENDPOINT } from '../config/endpoints';
import { axioService, GET } from '../services/axiosService';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import { notification } from 'antd';

const Authorize: React.FC = (props) => {
  const router = useRouter();
  const [intendToRedirect, setIntendToRedirect] = useState<any>('');
  const { token } = router.query;
  const [cookie, setCookie] = useCookies([
    'virtunus_token',
    'virtunus_user',
    'virtunus_state',
  ]);
  useEffect(() => {
    if (token) {
      const fetchUserInfo = async () => {
        try {
          const response = await axioService(
            GET,
            SERVER_USER_PROFILE_ENDPOINT,
            {},
            token
          );
          if (response && response.data) {
            setCookie(
              'virtunus_state',
              {
                session: {
                  token: token,
                  userInfo: response.data.data,
                },
              },
              {
                maxAge: 7776000,
              }
            );
            window.location.href = '/';
          }
        } catch (error) {
          console.error('not found');
        }
      };

      try {
        fetchUserInfo();
      } catch (error) {
        console.error('not found');
      }
    } else {
      // router.push({
      //   pathname: '/',
      // });
    }
  }, [router, props]);

  return <div>Authorizing .....</div>;
};
export default Authorize;
