import AzureAuthenticationContext from './azure-authentication-context';
import { AuthenticationResult } from '@azure/msal-browser';
import { logUserOut, setUser } from '../redux/actions/userActions';
import store from '../redux/store';

const ua = window.navigator.userAgent;
const msie = ua.indexOf('MSIE ');
const msie11 = ua.indexOf('Trident/');
const isIE = msie > 0 || msie11 > 0;

const authenticationModule: AzureAuthenticationContext = new AzureAuthenticationContext();

export const logIn = (method: string): any => {
    const typeName = method;
    const logInType = isIE ? 'loginRedirect' : typeName;

    // Azure Login
    authenticationModule.login(logInType, returnedAccountInfo);
};

export const logOut = (user: any): any => {
    if (user) {
        // Azure Logout
        authenticationModule.logout(user);
        logUserOut();
    }
};

const returnedAccountInfo = (user: AuthenticationResult) => {
    console.log(user);
    store.dispatch(setUser(user));
};
