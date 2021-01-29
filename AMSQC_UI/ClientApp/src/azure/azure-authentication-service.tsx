import AzureAuthenticationContext from './azure-authentication-context';
import { AuthenticationResult } from '@azure/msal-browser';
import store from '../redux/store';
import { SET_USER } from '../redux/constants/userConstants';

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

export const logOut = (user: any) => {
    if (user) {
        // Azure Logout
        authenticationModule.logout(user);
    }
};

const returnedAccountInfo = (user: AuthenticationResult) => {
    store.dispatch({ type: SET_USER, user });
};
