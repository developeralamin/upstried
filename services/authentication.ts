import { loadState } from "./cookieStorageSync";

/**
 * authentocation token
 * @params {any} - state that is requested to be saved in local storage
 */
export const getAuthToken = (request: any = null) => {
    const state = loadState(request);
    return state ? state.session.token : '';
}

/**
 * authentocation user
 * @params {any} - state that is requested to be saved in local storage
 */
export const getAuthUser = (request: any = null) => {
    const state = loadState(request);
    return state ? state.session.userInfo : null;
}

export const isAuthenticated = (request: any = null) => {
    return getAuthToken(request) && getAuthUser(request) ? true : false;
};


/**
 * authentocation username
 * @params {any}
 */
export const getAuthUsername = (request: any = null) => {
    const user = getAuthUser(request);
    return user ? user.username : '';
}