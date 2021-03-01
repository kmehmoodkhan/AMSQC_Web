import { Configuration, LogLevel } from '@azure/msal-browser';

const AzureActiveDirectoryAppClientId: any = 'c5d95646-d19b-4b44-a7a4-b6aacc1ca2ab';

export const MSAL_CONFIG: Configuration = {
    auth: {
        clientId: AzureActiveDirectoryAppClientId,
        authority: 'https://login.microsoftonline.com/24e5c438-26c7-4e34-9d59-32f09f793bc9',
    },
    cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: false,
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        // console.info(message);
                        return;
                    case LogLevel.Verbose:
                        // console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            },
        },
    },
};

export const PopUpRequest = { scopes: ['api://57323e8e-087a-4b3a-85f1-6956936b2a1f/.default'] };
