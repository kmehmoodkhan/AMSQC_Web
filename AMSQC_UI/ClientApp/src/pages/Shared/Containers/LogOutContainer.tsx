import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logUserOut } from '../../../redux/actions/userActions';
import { RootState } from '../../../redux/store';

export default function LogOutContainer() {
    //hooks
    const dispatch = useDispatch();
    const history = useHistory();

    //selectors
    const user = useSelector((state: RootState) => state.user.user);

    useLayoutEffect(() => {
        if (user) {
            dispatch(logUserOut());
            history.push('/');
        }
    }, [user]);
    return <div></div>;
}
