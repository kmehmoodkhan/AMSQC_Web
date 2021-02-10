import { Error } from '../../common/types';
import { HIDE_LOADER, SET_ERROR_MESSAGE, SHOW_LOADER, SHOW_NOTIFICATION } from '../constants/sharedConstants';

type sharedReducerType = {
    loading: boolean;
    error: Error | null;
    errorMessage: string;
};

const defaultState: sharedReducerType = {
    loading: false,
    error: null,
    errorMessage: '',
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
        default:
            return state;
    }
};

export default sharedReducer;
