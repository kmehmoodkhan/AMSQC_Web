import AzureAuthenticationContext from './azure-authentication-context';
import { AuthenticationResult } from '@azure/msal-browser';
import store from '../redux/store';
import { SET_USER } from '../redux/constants/userConstants';
import { FORCE_LOG_OUT } from '../redux/constants/sharedConstants';

const ua = window.navigator.userAgent;
const msie = ua.indexOf('MSIE ');
const msie11 = ua.indexOf('Trident/');
const isIE = msie > 0 || msie11 > 0;

const authenticationModule: AzureAuthenticationContext = new AzureAuthenticationContext();

export const logIn = (method: string, callback: any): any => {
    const typeName = method;
    const logInType = isIE ? 'loginRedirect' : typeName;

    // Azure Login
    authenticationModule.login(logInType, returnedAccountInfo, callback);
};

export const refreshToken = (user: any, callback: any): any => {
    // Azure Login
    authenticationModule.refreshToken(user, returnedAccountInfo, callback);
};

export const logOut = (user: any) => {
    if (user) {
        // Azure Logout
        authenticationModule.logout(user).catch(() => {
            store.dispatch({ type: FORCE_LOG_OUT });
        });
    }
};

const returnedAccountInfo = (user: AuthenticationResult) => {
    store.dispatch({ type: SET_USER, user });
};
