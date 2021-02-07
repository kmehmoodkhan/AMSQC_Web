import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logOut } from '../../../azure/azure-authentication-service';
import { logUserOut } from '../../../redux/actions/userActions';
import { RootState } from '../../../redux/store';
import LoggedInHeader from '../Components/LoggedInHeader';

export default function LoggedInHeaderContainer(props: any) {
    // General hooks
    const history = useHistory();
    const dispatch = useDispatch();

    // useSelector
    const user = useSelector((state: RootState) => state.user.user);
    const loggedIn = useSelector((state: RootState) => state.user.loggedIn);
    const quoteNo = useSelector((state: RootState) => state.quote.quoteNo);

    useEffect(() => {
        if (!loggedIn || !quoteNo) history.push('/');
    }, []);

    return (
        <>
            <LoggedInHeader
                fullName={user?.name}
                company=""
                onLogOut={() => {
                    dispatch(logUserOut());
                    // debugger;
                    // persistor.purge();
                    logOut(user);
                }}
            />
            {props.children}
        </>
    );
}
