import axios from 'axios';
import AccountsAPI from '../api/accounts/request';
import { getAuthToken } from './authentication';

/** Interface to describe a flexible object */
interface FlexObj {
  [key: string]: any;
}

// Request types
/** GET REQUEST TYPE */
export const GET = 'GET';
type GET = typeof GET;

/** POST REQUEST TYPE */
export const POST = 'POST';
type POST = typeof POST;

/** DELETE REQUEST TYPE */
export const DELETE = 'DELETE';
type DELETE = typeof DELETE;

/**
 * axioGet makes a get request using the axio libary
 * @param {string} url - the url where the get request will be made
 * @param {FlexObj | FlexObj[]} params - the parameters that will be passed
 * @param {boolean} isProtected - if true, access token will be included in header; otherwise, not.
 * @returns {any} - response returned by the server if successful
 */
export const axioGet = async (
  url: string,
  params: FlexObj | FlexObj[] = {},
  authorizedToken?: string,
  headers?: any
) => {

  const token = authorizedToken ? authorizedToken : getAuthToken();

  const config: any = {
    headers: {
      Accept: `application/json`,
      Authorization: `Bearer ${token}`,
    },
  };
  if (headers) {
    config.headers = { ...config.headers, ...headers };
  }
  config.headers['cf-ipcountry'] = null;

  const response = await axios.get(url, {
    ...config,
    params,
  });
  return await response;
};

/**
 * axioPost makes a post request using the axio libary
 * @param {string} url - the url where the post request will be made
 * @param {FlexObj | FlexObj[]} params - the parameters that will be passed
 * @param {boolean} isProtected - if true, access token will be included in header; otherwise, not.
 * @returns {any} - response returned by the server if successful
 */
export const axioPost = async (
  url: string,
  params: FlexObj | FlexObj[] = {},
  authorizedToken?: string
) => {
  const token = authorizedToken ? authorizedToken : getAuthToken();
  const config: any = {
    headers: {
      Accept: `application/json`,
      Authorization: `Bearer ${token}`,
    },
  };
  config.headers['cf-ipcountry'] = null;

  const response = await axios.post(url, params, config);
  return await response;
};

/**
 * axioDelete makes a delete request using the axio libary
 * @param {string} url - the url where the delete request will be made
 * @param {boolean} isProtected - if true, access token will be included in header; otherwise, not.
 * @returns {any} - response returned by the server if successful
 */
export const axioDelete = async (url: string, authorizedToken?: string) => {

  const token = authorizedToken ? authorizedToken : getAuthToken();

  const config = {
    headers: {
      Accept: `application/json`,
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(url, config);
  return await response;
};

/**
 * axioService makes a server request using the axio libary
 * @param {GET|POST|DELETE} type - the type of request
 * @param {string} url - the url where the request will be made
 * @param {FlexObj | FlexObj[]} params - the parameters that will be passed
 * @param {boolean} isProtected - if true, access token will be included in header; otherwise, not.
 * @returns {any} - response returned by the server if successful; otherwise, error object
 */
export const axioService = async (
  type: GET | POST | DELETE,
  url: any,
  params: FlexObj | FlexObj[] = {},
  authorizedToken?: any,
  flogout = true,
  headers = null
) => {
  let response;
  try {
    if (type === POST) {
      response = await axioPost(url, params, authorizedToken);
    } else if (type === DELETE) {
      response = await axioDelete(url, authorizedToken);
    } else {
      response = await axioGet(url, params, authorizedToken, headers);
    }
    return await response;
  } catch (e: any) {
    if (e?.response?.status === 401) {
      /** resets the session if there is a token */
      if (flogout) {
        AccountsAPI.logoutForcely();
      }
      throw e;
    } else {
      throw e;
    }
  }
};
