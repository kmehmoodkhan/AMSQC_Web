import { HIDE_LOADER, SHOW_LOADER } from '../constants/sharedConstants';

export const showLoader = () => (dispatch: any) => {
    dispatch({ type: SHOW_LOADER });
};

export const hideLoader = () => (dispatch: any) => {
    dispatch({ type: HIDE_LOADER });
};
