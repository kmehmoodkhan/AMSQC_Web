import { persistor } from '../store';

type userReducerType = {
    loggedIn: boolean;
    user: any;
    accessToken: string;
};

const defaultState: userReducerType = {
    loggedIn: false,
    user: {},
    accessToken: '',
};

const userReducer = (state = defaultState, action: any): userReducerType => {
    switch (action.type) {
        case 'SET_USER':
            return {
                loggedIn: true,
                user: { ...action.user.account },
                accessToken: action.user.accessToken,
            };
        case 'LOG_OUT':
            persistor.purge();
            return {
                loggedIn: false,
                user: {},
                accessToken: '',
            };
        default:
            return state;
    }
};

export default userReducer;
