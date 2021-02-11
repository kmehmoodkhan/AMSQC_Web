type userReducerType = {
    loggedIn: boolean;
    user: any;
    accessToken: string;
    tokenExpiresOn: Date | null;
};

const defaultState: userReducerType = {
    loggedIn: false,
    user: {},
    accessToken: '',
    tokenExpiresOn: null,
};

const userReducer = (state = defaultState, action: any): userReducerType => {
    switch (action.type) {
        case 'SET_USER':
            return {
                loggedIn: true,
                user: { ...action.user.account },
                accessToken: action.user.accessToken,
                tokenExpiresOn: action.user.expiresOn,
            };
        default:
            return state;
    }
};

export default userReducer;
