import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logIn, refreshToken } from '../../../azure/azure-authentication-service';
import { QuoteSteps } from '../../../common/enum';
import { GetQuoteAvailable, GetQuoteDetails } from '../../../redux/actions/quoteAction';
import { showLoader } from '../../../redux/actions/sharedActions';
import { RootState } from '../../../redux/store';
import Header from '../components/Header';
import Home from '../components/Home';
import { CLEAR_QUOTE_DATA } from '../../../redux/constants/quoteConstants';
import { SET_ERROR_MESSAGE } from '../../../redux/constants/sharedConstants';

export default function HomeContainer() {
    // General hooks
    var history = useHistory();

    const dispatch = useDispatch();

    // Use Selector

    const loggedIn = useSelector((state: RootState) => state.user.loggedIn);

    const loading = useSelector((state: RootState) => state.shared.loading);

    const quoteDetails = useSelector((state: RootState) => state.quote.quoteDetails);

    const quoteStep = useSelector((state: RootState) => state.quote.quoteStep);

    const quoteNo = useSelector((state: RootState) => state.quote.quoteNo);

    const errorMessage = useSelector((state: RootState) => state.shared.errorMessage);
    const user = useSelector((state: RootState) => state.user.user);

    // Use State
    const [quoteId, setQuoteId] = useState('');
    const [hasError, setHasError] = useState(false);

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
                    dispatch({ type: SET_ERROR_MESSAGE, errorMessage: 'Please enter valid quote number' });
                }
                break;
            case QuoteSteps.QuoteAvailability:
                dispatch(showLoader());
                dispatch(GetQuoteAvailable(quoteId, 'RMA Burmawood'));
                break;
        }
    };

    const onBlur = () => {
        if (loggedIn && quoteId) {
            if (false) refreshToken(user, () => {});
            if (QuoteSteps.QuoteAvailability == quoteStep) {
                dispatch({ type: CLEAR_QUOTE_DATA });
            }
            if (quoteId && quoteId.length > 0 && /^\d+$/.test(quoteId)) {
                dispatch(showLoader());
                dispatch(GetQuoteDetails(quoteId));
            } else {
                dispatch({ type: SET_ERROR_MESSAGE, errorMessage: 'Please enter valid quote number' });
            }
        }
    };

    // Side Effects

    useEffect(() => {
        setQuoteId(quoteNo);
    }, [quoteNo]);

    useEffect(() => {
        if (quoteStep == QuoteSteps.SubmitQuote) {
            history.push('/file-upload');
        }
    });

    useEffect(() => {
        if (errorMessage) setHasError(true);
    }, [errorMessage]);

    return (
        <>
            <Header />
            <Home
                onQuoteChange={(val: string) => {
                    setQuoteId(val);
                    setHasError(false);
                    if (!val) {
                        dispatch({ type: CLEAR_QUOTE_DATA });
                    }
                    if (errorMessage) dispatch({ type: SET_ERROR_MESSAGE, errorMessage: '' });
                }}
                quoteId={quoteId}
                onSubmit={onSubmit}
                quoteDetails={quoteDetails}
                loading={loading}
                onBlur={onBlur}
                hasError={hasError}
                errorMessage={errorMessage}
            />
        </>
    );
}
