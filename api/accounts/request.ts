import { destroyState } from './../../services/cookieStorageSync';
import Api from '../API';
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  LOGOUT_ROUTE,
  SIGNUP_ROUTE,
} from './../../config/endpoints';

class AccountsAPI extends Api {
  async logout() {
    destroyState();
    localStorage.setItem('firebase_device_token', '');
    window.location.href = `${LOGOUT_ROUTE}&guest=${encodeURIComponent(
      HOME_ROUTE
    )}`;
  }

  goToLogin() {
    const redirect = window.location.href;
    sessionStorage.setItem('intend_to_redirect', redirect);
    window.location.href = LOGIN_ROUTE;
  }

  goToSignup() {
    window.location.href = SIGNUP_ROUTE;
  }

  async logoutForcely() {
    const redirect = window.location.href;
    //    sessionStorage.setItem('intend_to_redirect', redirect);
    localStorage.setItem('firebase_device_token', '');
    window.location.href = `${LOGOUT_ROUTE}&redirect=${window.location.href}`;
  }
}

export default new AccountsAPI();
