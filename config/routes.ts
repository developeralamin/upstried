export const HOME_ROUTE = `/`;
export const TIPS_ROUTE = `/books`;
export const TIPS_FOLLOWINGS_ROUTE = `books/followings`;
export const PROFILE_ROUTE = '/profile';
export const PROFILE_MY_TIPS_ROUTE = `profile?content=mytips`;
export const PROFILE_ENROLLED_TIPS_ROUTE = `profile?content=enrolledtips`;
export const PROFILE_SAVED_TIPS_ROUTE = `profile?content=savedtips`;

export const AUTHOR_ROUTE = (username: any) => `profile/${username}`;
