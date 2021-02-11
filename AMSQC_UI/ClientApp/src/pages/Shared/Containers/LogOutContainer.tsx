import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { logUserOut } from '../../../redux/actions/userActions';
import { RootState } from '../../../redux/store';

export default function LogOutContainer() {
    //hooks
    const dispatch = useDispatch();
    const history = useHistory();
    const { accountid } = useParams<any>();

    //selectors
    const user = useSelector((state: RootState) => state.user.user);

    useLayoutEffect(() => {
        if (user) {
            if (accountid == user.localAccountId) {
                dispatch(logUserOut());
                history.push('/');
            }
        }
    }, [user]);
    return <div></div>;
}
