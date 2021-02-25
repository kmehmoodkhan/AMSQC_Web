import { SET_REGION, SET_USER } from '../constants/userConstants';

type userReducerType = {
    loggedIn: boolean;
    user: any;
    accessToken: string;
    tokenExpiresOn: Date | null;
    region: string | null;
};

const defaultState: userReducerType = {
    loggedIn: false,
    user: {},
    accessToken: '',
    tokenExpiresOn: null,
    region: '',
};

const userReducer = (state = defaultState, action: any): userReducerType => {
    switch (action.type) {
        case SET_USER:
            return {
                loggedIn: true,
                user: { ...action.user.account },
                accessToken: action.user.accessToken,
                tokenExpiresOn: action.user.expiresOn,
                region: '',
            };
        case SET_REGION:
            return { ...state, region: action.region };
        default:
            return state;
    }
};

export default userReducer;
