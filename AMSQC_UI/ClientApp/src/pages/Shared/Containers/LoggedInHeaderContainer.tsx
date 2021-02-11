import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logOut } from '../../../azure/azure-authentication-service';
import { RootState } from '../../../redux/store';
import LoggedInHeader from '../Components/LoggedInHeader';

export default function LoggedInHeaderContainer(props: any) {
    // General hooks
    const history = useHistory();
    const dispatch = useDispatch();

    // useSelector
    const user = useSelector((state: RootState) => state.user.user);
    const loggedIn = useSelector((state: RootState) => state.user.loggedIn);
    const expiresOn = useSelector((state: RootState) => state.user.tokenExpiresOn);
    const quoteNo = useSelector((state: RootState) => state.quote.quoteNo);

    useEffect(() => {
        if (expiresOn) {
            var expiry;
            if (expiresOn && typeof expiresOn === 'string') {
                expiry = new Date(expiresOn);
            } else {
                expiry = expiresOn;
            }
            const now = new Date();
            if (expiry < now) {
                dispatch({ type: 'LOG_OUT' });
                history.push('/');
            }
        }
        if (!loggedIn || !quoteNo) {
            history.push('/');
        }
    }, [loggedIn, expiresOn, quoteNo]);

    return (
        <>
            <LoggedInHeader
                fullName={user?.name}
                company=""
                onLogOut={() => {
                    // debugger;
                    // persistor.purge();
                    logOut(user);
                }}
            />
            {props.children}
        </>
    );
}
