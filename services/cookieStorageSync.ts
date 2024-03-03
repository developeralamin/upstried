import cookie from 'cookie';
import Cookies from 'js-cookie';

const LOCAL_STORAGE_KEY_NAME =
  process.env.NEXT_PUBLIC_STORE_KEY || 'virtunus_state';

/**
 * loadState retrieves the store saved in local storage
 * @returns {any} - state that is previously stored in local storage; otherwise undefined
 */
export const loadState = (request: any = null): any => {
  try {
    let serializedState: any = undefined;
    if (request) {
      const state = cookie.parse(request.headers.cookie);
      serializedState = state[LOCAL_STORAGE_KEY_NAME];
    } else {
      serializedState = Cookies.get(LOCAL_STORAGE_KEY_NAME);
    }
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

/**
 * saveState saves the requested store state in local storage
 * @params {any} - state that is requested to be saved in local storage
 */
export const saveState = (state: any): void => {
  try {
    const serializedState = JSON.stringify(state);
    Cookies.set(LOCAL_STORAGE_KEY_NAME, serializedState, { expires: 90 });
  } catch (exception) {
    console.error(exception);
  }
};

/**
 * destroy session state
 */
export const destroyState = () => {
  Cookies.remove(LOCAL_STORAGE_KEY_NAME);
};
