import { Error } from '../../common/types';
import {
    FORCE_LOG_OUT,
    HIDE_LOADER,
    RESET_LOG_OUT,
    RESET_SHARED_STATE,
    SET_ERROR_MESSAGE,
    SET_GO_NEXT,
    SET_REPORT,
    SHOW_LOADER,
    SHOW_NOTIFICATION,
} from '../constants/sharedConstants';

type sharedReducerType = {
    loading: boolean;
    error: Error | null;
    errorMessage: string;
    goToNext: boolean;
    forceLogout: boolean;
    isReport: boolean;
};

const defaultState: sharedReducerType = {
    loading: false,
    error: null,
    errorMessage: '',
    goToNext: false,
    forceLogout: false,
    isReport: true,
};

const sharedReducer = (state = defaultState, action: any): sharedReducerType => {
    switch (action.type) {
        case SHOW_LOADER:
            return {
                ...state,
                loading: true,
            };
        case HIDE_LOADER:
            return {
                ...state,
                loading: false,
            };
        case SHOW_NOTIFICATION:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case SET_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.errorMessage,
            };
        case SET_GO_NEXT:
            return {
                ...state,
                goToNext: action.goToNext,
            };
        case FORCE_LOG_OUT:
            return {
                ...state,
                forceLogout: true,
            };
        case RESET_LOG_OUT:
            return {
                ...state,
                forceLogout: false,
            };
        case SET_REPORT:
            return {
                ...state,
                isReport: action.isReport,
            };
        case RESET_SHARED_STATE:
            return defaultState;
        default:
            return state;
    }
};

export default sharedReducer;
