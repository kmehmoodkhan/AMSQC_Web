import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logIn } from '../../../azure/azure-authentication-service';
import { QuoteSteps } from '../../../common/enum';
import { openNotificationWithError } from '../../Shared/Components/notification';
import { GetQuoteDetails } from '../../../redux/actions/quoteAction';
import { showLoader } from '../../../redux/actions/sharedActions';
import { RootState } from '../../../redux/store';
import Header from '../components/Header';
import Home from '../components/Home';

export default function HomeContainer() {
    // General hooks
    var history = useHistory();

    const dispatch = useDispatch();

    // Use State
    const [quoteId, setQuoteId] = useState('');

    const [alreadySubmitted, setAlreadySubmitted] = useState(false);

    // Use Selector
    const alreadySubmittedVal = useSelector((state: RootState) => state.quote.alreadySubmitted);

    const loggedIn = useSelector((state: RootState) => state.user.loggedIn);

    const loading = useSelector((state: RootState) => state.shared.loading);

    const carDetails = useSelector((state: RootState) => state.quote.carDetails);

    const quoteStep = useSelector((state: RootState) => state.quote.quoteStep);

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
            case QuoteSteps.SubmitQuote:
                history.push('/file-upload');
                break;
        }
    };

    // Side Effects

    useEffect(() => {
        setAlreadySubmitted(alreadySubmittedVal);
    }, [alreadySubmittedVal]);

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
