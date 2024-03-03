import { isAuthenticated } from "./authentication";
import Storage from "./sessionStorage";
const STORAGE_KEY_NAME = 'pendingActions';

export const setPendingActions = (pendingActions: any) => {
    Storage.save(STORAGE_KEY_NAME, pendingActions);
}

export const removePendingAction = () => Storage.remove(STORAGE_KEY_NAME);

export const getPendingAction = () => {
    return Storage.get(STORAGE_KEY_NAME);
}

export const getPendingEnrollment = (key: any) => {
    if (!isAuthenticated()) return false;
    const pendingAction = getPendingAction();
    if (pendingAction && pendingAction.name === 'enroll' && pendingAction.query.slug === key) {
        return true;
    }
    return false;
}


export const getPendingSavingTips = (key: any) => {
    if (!isAuthenticated()) return false;
    const pendingAction = getPendingAction();
    if (pendingAction && pendingAction.name === 'saveTips' && pendingAction.query.slug === key) {
        return true;
    }
    return false;
}
