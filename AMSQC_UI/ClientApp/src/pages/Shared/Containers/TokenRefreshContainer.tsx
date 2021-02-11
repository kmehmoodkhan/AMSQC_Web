import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { refreshToken } from '../../../azure/azure-authentication-service';
import { RootState } from '../../../redux/store';

export default function TokenRefreshContainer() {
    // hooks
    const dispatch = useDispatch();
    const history = useHistory();

    // use selector
    const expiresOn = useSelector((state: RootState) => state.user.tokenExpiresOn);
    const user = useSelector((state: RootState) => state.user.user);
    const [intervalId, setIntervalId] = useState<any>(null);

    useEffect(() => {
        var expiry;
        if (expiresOn && typeof expiresOn === 'string') {
            expiry = new Date(expiresOn);
        } else {
            expiry = expiresOn;
        }

        if (expiry && user) {
            const now: any = new Date();
            if (intervalId != null) {
                window.clearInterval(intervalId);
            }
            if (expiry > now) {
                let id = window.setInterval(() => {
                    refreshToken(user, () => {});
                }, 30000);
                setIntervalId(id);
            } else {
                dispatch({ type: 'LOG_OUT' });
                history.push('/');
            }
        } else {
            clearInterval(intervalId);
        }
        return () => {
            if (intervalId != null) {
                window.clearInterval(intervalId);
            }
        };
    }, [expiresOn]);
    return <></>;
}
