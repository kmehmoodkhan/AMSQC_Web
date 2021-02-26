import { SET_REGION, SET_USER } from '../constants/userConstants';

type userReducerType = {
    loggedIn: boolean;
    user: any;
    accessToken: string;
    tokenExpiresOn: Date | null;
    region: string | null;
    regionId: number;
};

const defaultState: userReducerType = {
    loggedIn: false,
    user: {},
    accessToken: '',
    tokenExpiresOn: null,
    region: '',
    regionId: 0,
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
                regionId: 0,
            };
        case SET_REGION:
            return { ...state, region: action.region, regionId: action.regionId };
        default:
            return state;
    }
};

export default userReducer;
