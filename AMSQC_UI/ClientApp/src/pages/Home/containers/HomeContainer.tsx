import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logIn } from '../../../azure/azure-authentication-service';
import { QuoteSteps } from '../../../common/enum';
import { openNotificationWithError } from '../../Shared/Components/notification';
import { GetQuoteAvailable, GetQuoteDetails } from '../../../redux/actions/quoteAction';
import { showLoader } from '../../../redux/actions/sharedActions';
import { RootState } from '../../../redux/store';
import Header from '../components/Header';
import Home from '../components/Home';
import { CLEAR_QUOTE_DATA } from '../../../redux/constants/quoteConstants';

export default function HomeContainer() {
    // General hooks
    var history = useHistory();

    const dispatch = useDispatch();

    // Use Selector
    const alreadySubmittedVal = useSelector((state: RootState) => state.quote.alreadySubmitted);

    const loggedIn = useSelector((state: RootState) => state.user.loggedIn);

    const loading = useSelector((state: RootState) => state.shared.loading);

    const quoteDetails = useSelector((state: RootState) => state.quote.quoteDetails);

    const quoteStep = useSelector((state: RootState) => state.quote.quoteStep);

    const quoteNo = useSelector((state: RootState) => state.quote.quoteNo);

    // Use State
    const [quoteId, setQuoteId] = useState('');

    const [alreadySubmitted, setAlreadySubmitted] = useState(false);

    // Events and helpers
    const onSubmit = () => {
        switch (quoteStep) {
            case QuoteSteps.GetQuoteDetail:
                if (quoteId && quoteId.length > 0 && /^\d+$/.test(quoteId)) {
                    dispatch(showLoader());
                    if (!loggedIn) {
                        logIn('loginPopup', () => dispatch(GetQuoteDetails(quoteId)));
                    } else {
                        dispatch(GetQuoteDetails(quoteId));
                    }
                } else {
                    openNotificationWithError('Please enter valid quote number', 'Quote Number validation');
                }
                break;
            case QuoteSteps.QuoteAvailability:
                dispatch(showLoader());
                dispatch(GetQuoteAvailable(quoteId, 'RMA Burmawood'));
                break;
        }
    };

    const onBlur = () => {
        if (loggedIn) {
            if (quoteId && quoteId.length > 0 && /^\d+$/.test(quoteId)) {
                dispatch({ type: CLEAR_QUOTE_DATA });
                dispatch(showLoader());
                dispatch(GetQuoteDetails(quoteId));
            }
        }
    };

    // Side Effects

    useEffect(() => {
        setAlreadySubmitted(alreadySubmittedVal);
    }, [alreadySubmittedVal]);

    useEffect(() => {
        setQuoteId(quoteNo);
    }, [quoteNo]);

    useEffect(() => {
        if (quoteStep == QuoteSteps.SubmitQuote) {
            history.push('/file-upload');
        }
    });

    return (
        <>
            <Header />
            <Home
                onQuoteChange={(val: string) => {
                    setQuoteId(val);
                    setAlreadySubmitted(false);
                    if (!val) {
                        dispatch({ type: CLEAR_QUOTE_DATA });
                    }
                }}
                quoteId={quoteId}
                onSubmit={onSubmit}
                alreadySubmitted={alreadySubmitted}
                quoteDetails={quoteDetails}
                loading={loading}
                onBlur={onBlur}
            />
        </>
    );
}
