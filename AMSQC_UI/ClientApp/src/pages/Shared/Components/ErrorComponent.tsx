import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Error } from '../../../common/types';
import { RootState } from '../../../redux/store';
import {
    openNotificationWithError,
    openNotificationWithInfo,
    openNotificationWithSuccess,
    openNotificationWithWarning,
} from './notification';

export default function ErrorComponent() {
    //useSelector
    const error: Error = useSelector((state: RootState) => state.shared.error);

    useEffect(() => {
        if (error != null) {
            switch (error.type) {
                case 'warning':
                    openNotificationWithWarning(error.description, error.title);
                    break;
                case 'info':
                    openNotificationWithInfo(error.description, error.title);
                    break;
                case 'error':
                    openNotificationWithError(error.description, error.title);
                    break;
                case 'success':
                    openNotificationWithSuccess(error.description, error.title);
                    break;
                default:
                    openNotificationWithInfo(error.description, error.title);
                    break;
            }
        }
    }, [error]);

    return <></>;
}
