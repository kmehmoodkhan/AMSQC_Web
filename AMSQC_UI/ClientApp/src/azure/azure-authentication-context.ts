import {
    PublicClientApplication,
    AuthenticationResult,
    AccountInfo,
    EndSessionRequest,
    RedirectRequest,
    PopupRequest,
} from '@azure/msal-browser';
import store from '../redux/store';

import { MSAL_CONFIG, PopUpRequest } from './azure-authentication-config';

export class AzureAuthenticationContext {
    private myMSALObj: PublicClientApplication = new PublicClientApplication(MSAL_CONFIG);
    private account?: any;
    private loginRedirectRequest?: RedirectRequest;
    private loginRequest?: PopupRequest;

    public isAuthenticationConfigured = false;

    constructor() {
        // @ts-ignore
        this.account = null;
        this.setRequestObjects();
        if (MSAL_CONFIG?.auth?.clientId) {
            this.isAuthenticationConfigured = true;
        }
    }

    private setRequestObjects(): void {
        this.loginRequest = {
            scopes: [],
            prompt: 'select_account',
        };

        this.loginRedirectRequest = {
            ...this.loginRequest,
            redirectStartPage: window.location.href,
        };
    }

    login(signInType: string, setUser: any, callback: any): void {
        if (signInType === 'loginPopup') {
            this.myMSALObj
                .acquireTokenPopup(PopUpRequest)
                .then((resp: AuthenticationResult) => {
                    this.handleResponse(resp, setUser, callback);
                    console.log(resp);
                })
                .catch((err) => {
                    console.error(err);
                    store.dispatch({ type: 'HIDE_LOADER' });
                });
        } else if (signInType === 'loginRedirect') {
            this.myMSALObj.loginRedirect(this.loginRedirectRequest);
        }
    }

    logout(account: AccountInfo): Promise<void> {
        const logOutRequest: EndSessionRequest = {
            account,
            postLogoutRedirectUri: '/',
        };

        return this.myMSALObj.logout(logOutRequest);
    }

    handleResponse(response: AuthenticationResult, incomingFunction: any, callback: any) {
        if (response !== null) {
            this.account = { user: response.account, accessToken: response.accessToken };
        }

        if (this.account) {
            incomingFunction(response);
            callback();
        }
    }
    // private getAccount(): AccountInfo | undefined {
    //     console.log(`loadAuthModule`);
    //     const currentAccounts = this.myMSALObj.getAllAccounts();
    //     if (currentAccounts === null) {
    //         // @ts-ignore
    //         console.log('No accounts detected');
    //         return undefined;
    //     }

    //     if (currentAccounts.length > 1) {
    //         // TBD: Add choose account code here
    //         // @ts-ignore
    //         console.log('Multiple accounts detected, need to add choose account code.');
    //         return currentAccounts[0];
    //     } else if (currentAccounts.length === 1) {
    //         return currentAccounts[0];
    //     }
    // }
}

export default AzureAuthenticationContext;
