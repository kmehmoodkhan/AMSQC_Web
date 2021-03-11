import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logOut } from '../../../azure/azure-authentication-service';
import { RootState } from '../../../redux/store';
import LoggedInHeader from '../Components/LoggedInHeader';
import ReportHeader from '../Components/ReportHeader';

export default function LoggedInHeaderContainer(props: any) {
    // General hooks
    const history = useHistory();
    const dispatch = useDispatch();

    // useSelector
    const user = useSelector((state: RootState) => state.user.user);
    const region = useSelector((state: RootState) => state.user.region);
    const loggedIn = useSelector((state: RootState) => state.user.loggedIn);
    const expiresOn = useSelector((state: RootState) => state.user.tokenExpiresOn);
    const quoteNo = useSelector((state: RootState) => state.quote.quoteNo);
    const forceLogout = useSelector((state: RootState) => state.shared.forceLogout);
    const isReports = useSelector((state: RootState) => state.shared.isReport);

    // events
    const onLogout = () => {
        logOut(user);
    };

    //use effects
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
        if (!loggedIn || (!quoteNo && !isReports)) {
            history.push('/');
        }
    }, [loggedIn, expiresOn, quoteNo, isReports]);

    useEffect(() => {
        if (forceLogout) {
            history.push('/log-out');
        }
    }, [forceLogout]);

    return (
        <>
            {!isReports && <LoggedInHeader fullName={user?.name} region={region} onLogOut={onLogout} />}
            {isReports && <ReportHeader fullName={user?.name} onLogOut={onLogout} />}
            {props.children}
        </>
    );
}
