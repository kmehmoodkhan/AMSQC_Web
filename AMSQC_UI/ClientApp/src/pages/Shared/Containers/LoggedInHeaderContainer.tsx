import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
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
    const isReports = useSelector((state: RootState) => state.report.isReport);

    //useState

    const [reportId, setReportId] = useState(0);

    // events
    const onLogout = () => {
        logOut(user);
    };

    const showReportHeader = useMemo(() => {
        const isReportBool = !history.location.pathname.includes('reports-dashboard') && isReports;
        if (isReportBool) {
            const array = history.location.pathname.split('/');
            setReportId(array.length > 2 ? Number(array[2]) : 0);
        } else {
            setReportId(0);
        }
        return isReportBool;
    }, [isReports, history.location.pathname]);

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
            {!showReportHeader && <LoggedInHeader fullName={user?.name} region={region} onLogOut={onLogout} />}
            {showReportHeader && <ReportHeader fullName={user?.name} onLogOut={onLogout} reportId={Number(reportId)} />}
            {props.children}
        </>
    );
}
