// #temporary
const AUTH_API = process.env.NEXT_PUBLIC_AUTH_API;
const BASE_API = process.env.NEXT_PUBLIC_BASE_API;
const ACCOUNT_URL = process.env.NEXT_PUBLIC_ACCOUNT_URL;
const ACCOUNT_APP_NAME = process.env.NEXT_PUBLIC_ACCOUNT_APP_NAME;
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

/*
 * Client Routes
 */
export const HOME_ROUTE = `/`;
export const TIPS_ROUTE = `/books`;
export const TIPS_FOLLOWINGS_ROUTE = `/books/followings`;
export const TIPS_MY_INTEREST_ROUTE = `/books/my-interest`;
export const TIPS_POPULAR_ROUTE = `/books/popular`;
export const TIPS_RECENT_ROUTE = `/books/recent`;
export const TIPS_TRENDING_ROUTE = `/books/trending`;
export const TIPS_CATEGORIES_ROUTE = `/books/categories/:category`;
export const PROFILE_ROUTE = '/profile';
export const PROFILE_EDIT_ROUTE = '/profile/edit';
export const PROFILE_MY_TIPS_ROUTE = `profile?tabId=1`;
export const PROFILE_ENROLLED_TIPS_ROUTE = `profile?tabId=2`;
export const PROFILE_SAVED_TIPS_ROUTE = `profile?tabId=3`;
export const AUTHORS_ROUTE = '/authors';

/*
 * Server endpoints
 */

// Authorization routes

export const LOGIN_ROUTE = `${ACCOUNT_URL}/login?app=${ACCOUNT_APP_NAME}`;
export const LOGOUT_ROUTE = `${ACCOUNT_URL}/logout?app=${ACCOUNT_APP_NAME}`;
export const SIGNUP_ROUTE = `${ACCOUNT_URL}/signup?app=${ACCOUNT_APP_NAME}`;

// Server endpoints
export const SERVER_LOGOUT_ENDPOINT = `${AUTH_API}/logout`;
export const SERVER_USER_PROFILE_ENDPOINT = `${AUTH_API}/profile/basic`;
export const SERVER_USER_DEACTIVATE_ENDPOINT = `${AUTH_API}/account/deactivate`;
export const SERVER_FILE_UPLOAD_ENDPOINT = `${AUTH_API}/file/upload`;
export const SERVER_ACCOUNT_CREDENTIALS_CHANGE_ENDPOINT = `${AUTH_API}/account/change-credentials`;
export const SERVER_ACCOUNT_AVATAR_CHANGE_ENDPOINT = `${AUTH_API}/profile/change-avatar`;

// Tips
export const SERVER_TIPS_ENDPOINT = `${BASE_API}/books`;
export const SERVER_TIP_STORE_ENDPOINT = `${BASE_API}/books`;
export const SERVER_TIP_UPDATE_ENDPOINT = `${BASE_API}/books/:slug`;
export const SERVER_TIP_VIEW_ENDPOINT = `${BASE_API}/books/:slug/details`; //deprecated
export const SERVER_TIP_DETAILS_ENDPOINT = `${BASE_API}/books/:id/details`; //new

export const SERVER_REACTION_ENDPOINT = `${BASE_API}/books/reactions`;
export const SERVER_TIPS_ENROLL_ENDPOINT = `${BASE_API}/books/:slug/enroll`;
export const SERVER_TIPS_NOTIFICATION_SETTINGS_ENDPOINT = `${BASE_API}/books/:slug/notification-settings`;
export const SERVER_TIPS_ENROLLED_FETCH_ENDPOINT = `${BASE_API}/books/authors/:username/enrolled-tips`;
export const SERVER_TIPS_ENROLLMENTS_ENDPOINT = `${BASE_API}/books/authors/:username/enrollments`;
export const SERVER_TIPS_MYTIPS_FETCH_ENDPOINT = `${BASE_API}/books/authors/:username/my-tips`;
export const SERVER_TIPS_SAVED_FETCH_ENDPOINT = `${BASE_API}/books/authors/:username/saved-tips`;
export const SERVER_TIPS_SAVED_ENDPOINT = `${BASE_API}/books/:slug/save`;
export const SERVER_TIPS_REPORT_STORE_ENDPOINT = `${BASE_API}/books/:slug/reports`;
export const SERVER_TIPS_REPORT_UNDO_ENDPOINT = `${BASE_API}/books/:slug/reports/:reportId`;
export const SERVER_TIPS_SITEMAP_ENDPOINT = `${BASE_API}/sitemap/books`;
export const SERVER_AUTHOR_SITEMAP_ENDPOINT = `${BASE_API}/sitemap/books/authors`;

export const SERVER_AUTHOR_FOLLOWING_ENDPOINT = `${BASE_API}/books/authors/:username/following`;
export const SERVER_AUTHOR_FOLLOWERS_ENDPOINT = `${BASE_API}/books/authors/:username/followers`;
export const SERVER_AUTHOR_BLOCK_ENDPOINT = `${BASE_API}/books/authors/:username/block`;
export const SERVER_AUTHOR_BLOCK_LIST_ENDPOINT = `${BASE_API}/books/authors/:username/block-list`;
export const SERVER_AUTHOR_UNBLOCK_ENDPOINT = `${BASE_API}/books/authors/:username/unblock`;

export const SERVER_TIPS_DISCARD_ENDPOINT = `${BASE_API}/books/:slug/discard`;

//Tags
export const SERVER_TAGS_FETCH_ENDPOINT = `${BASE_API}/books/categories`;

export const SERVER_TIP_COMMENT_STORE_ENDPOINT = `${BASE_API}/books/:slug/comments`;
export const SERVER_TIP_COMMENTS_VIEW_ENDPOINT = `${BASE_API}/books/:slug/comments`;
export const SERVER_TIP_COMMENT_DELETE_ENDPOINT = `${BASE_API}/books/comments/:commentId`;
export const SERVER_TIP_COMMENT_EDIT_ENDPOINT = `${BASE_API}/books/comments/:commentId`;
export const SERVER_TIP_DELETE_ENDPOINT = `${BASE_API}/books/:slug`;

// profile
export const SERVER_TIPS_USER_PROFILE_ENDPOINT = `${BASE_API}/books/authors/:username`;

export const SERVER_SCRAPPER_ENDPOINT = `${SITE_URL}/api/link`;
/** Authors */
export const SERVER_AUTHORS_ENDPOINT = `${BASE_API}/books/authors/`;
export const SERVER_AUTHORS_VIEW_ENDPOINT = `${BASE_API}/books/authors/:username`;
export const SERVER_AUTHOR_FOLLOW_ENDPOINT = `${BASE_API}/books/authors/:username/follow`;
export const SERVER_AUTHOR_UNFOLLOW_ENDPOINT = `${BASE_API}/books/authors/:username/unfollow`;

/** survey */
export const SERVER_SURVEY_ENDPOINT = `${BASE_API}/books/authors/:username/survey/responses`;
export const SERVER_SURVEY_INTERESTS_ENDPOINT = `${BASE_API}/books/interests`;

/** tasks */
export const SERVER_TIPS_TASKS_ENDPOINT = `${BASE_API}/books/:slug/tasks`; //deprecated
export const SERVER_TIPS_ENROLLMENT_TASKS_ENDPOINT = `${BASE_API}/books/enrollments/:enrollment_id/details`; //new

/** task-dashboard */

export const SERVER_TASK_DASHBOARD_ENDPOINT = `${BASE_API}/books/authors/:username/tasks`;
// export const SERVER_TASK_DASHBOARD_MARK_ALL_DONE_TASKS_ENDPOINT = `${BASE_API}/books/tasks/mark-all`;
export const SERVER_TASK_DASHBOARD_MARK_ALL_DONE_TASKS_ENDPOINT = `${BASE_API}/books/enrollments/:enrollment_id/mark-tasks`;

/** notifications */
export const SERVER_NOTIFICATIONS_ENDPOINT = `${AUTH_API}/notifications`;
export const SERVER_DEVICE_TOKEN_ENDPOINT = `${AUTH_API}/device-token`;

/** store links */
export const GOOGLE_PLAY_STORE_LINK =
  'https://play.google.com/store/apps/details?id=com.virtunus.tips.tips_mobile_app';
export const APPLE_PLAY_STORE_LINK =
  'https://apps.apple.com/us/app/virtunus-tips/id1579465478';

/**   */
export const SERVER_TIPS_LANGUAGE_ENDPOINT = `${BASE_API}/books/languages`;

export const SERVER_ENROLLMENT_TIPS_REPORT_ENDPOINT = `${BASE_API}/books/enrollments/:enrollment_id/report`;

export const SERVER_ENROLLMENT_TASK_LOGS_ENDPOINT = `${BASE_API}/books/enrollments/:enrollment_id/tasks/:task_id/logs`;
export const SERVER_ENROLLMENT_TASK_FETCH_TOKEN = `${BASE_API}/books/enrollments/:enrollment_id/report/enable-sharing`;
export const SERVER_ENROLLMENT_TASK_DISABLE_LINK = `${BASE_API}/books/enrollments/:enrollment_id/report/disable-sharing`;

//enrollment Histoy
export const SERVER_ENROLLMENT_HISTORY = `${BASE_API}/books/:tips_id/:username/enrollments`;
export const SERVER_TIPS_TIMEZONE_ENDPOINT = `${AUTH_API}/timezone-list`;

export const SERVER_TIPS_TIMEZONE_SETTING_ENDPOINT = `${AUTH_API}/settings`;

//Tips Audio Uplaod
export const SERVER_TIPS_AUDIO_UPLOAD = `${BASE_API}/books/file/upload`;
export const SERVER_PAYMENTS = `${BASE_API}/books/payments/:type`;
export const SERVER_LIKE_TIPS = `${BASE_API}/books/popular`;
export const SERVER_CATEGORY_BASED_TIPS = `${BASE_API}/books/category/:slug`;
