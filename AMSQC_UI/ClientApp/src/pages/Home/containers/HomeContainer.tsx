import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitQuote } from '../../../api/quoteapi';
import { logIn } from '../../../azure/azure-authentication-service';
import { openNotificationWithError } from '../../../components/notification';
import { RootState } from '../../../redux/store';
import Header from '../components/Header';
import Home from '../components/Home';

export default function HomeContainer() {
    const [quoteId, setQuoteId] = useState('');

    const [alreadySubmitted, setAlreadySubmitted] = useState(false);

    const loggedIn = useSelector((state: RootState) => state.user.loggedIn);

    const loading = useSelector((state: RootState) => state.shared.loading);

    const dispatch = useDispatch();

    const [carDetails, setCarDetails] = useState(null);

    const onSubmit = () => {
        if (quoteId && quoteId.length > 0 && /^\d+$/.test(quoteId)) {
            dispatch({ type: 'SHOW_LOADER' });
            if (!loggedIn) {
                logIn('loginPopup', () => SubmitQuoteNumber());
            } else {
                SubmitQuoteNumber();
            }
        } else {
            openNotificationWithError('Please enter valid quote number', 'Quote Number validation');
        }
    };

    const SubmitQuoteNumber = () => {
        SubmitQuote(quoteId)
            .then((response: any) => {
                if (response.data.success) {
                    if (response.data.result.alreadySubmitted) {
                        setAlreadySubmitted(true);
                    } else {
                        setCarDetails(response.data.result.quote);
                    }
                } else {
                    openNotificationWithError();
                }
            })
            .catch((err) => openNotificationWithError(err, 'Error'));
    };

    return (
        <>
            <Header />
            <Home
                onQuoteChange={(val: string) => {
                    setQuoteId(val);
                    setAlreadySubmitted(false);
                }}
                quoteId={quoteId}
                onSubmit={onSubmit}
                alreadySubmitted={alreadySubmitted}
                carDetails={carDetails}
                loading={loading}
            />
        </>
    );
}
