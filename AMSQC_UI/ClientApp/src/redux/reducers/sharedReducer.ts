import { Error } from '../../common/types';
import {
    HIDE_LOADER,
    SET_ERROR_MESSAGE,
    SET_GO_NEXT,
    SHOW_LOADER,
    SHOW_NOTIFICATION,
} from '../constants/sharedConstants';

type sharedReducerType = {
    loading: boolean;
    error: Error | null;
    errorMessage: string;
    goToNext: boolean;
};

const defaultState: sharedReducerType = {
    loading: false,
    error: null,
    errorMessage: '',
    goToNext: false,
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
        default:
            return state;
    }
};

export default sharedReducer;
