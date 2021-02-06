import { HIDE_LOADER, SHOW_LOADER, SHOW_NOTIFICATION } from '../constants/sharedConstants';

export const showLoader = () => (dispatch: any) => {
    dispatch({ type: SHOW_LOADER });
};

export const hideLoader = () => (dispatch: any) => {
    dispatch({ type: HIDE_LOADER });
};

export const showNotification = (error: Error) => (dispatch: any) => {
    dispatch({ type: SHOW_NOTIFICATION, error });
};
