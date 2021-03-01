import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logIn } from '../../../azure/azure-authentication-service';
import { QuoteSteps } from '../../../common/enum';
import { GetQuoteAvailable, GetQuoteDetails } from '../../../redux/actions/quoteAction';
import { showLoader } from '../../../redux/actions/sharedActions';
import { RootState } from '../../../redux/store';
import Header from '../components/Header';
import Home from '../components/Home';
import { CLEAR_QUOTE_DATA } from '../../../redux/constants/quoteConstants';
import { SET_ERROR_MESSAGE } from '../../../redux/constants/sharedConstants';
import { CLEAR_SURVEY_DATA } from '../../../redux/constants/surveyConstants';

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

    const expiresOn = useSelector((state: RootState) => state.user.tokenExpiresOn);

    const region = useSelector((state: RootState) => state.user.region);

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
                dispatch(GetQuoteAvailable(quoteId, region));
                break;
        }
    };

    const onBlur = () => {
        if (loggedIn && quoteId && QuoteSteps.QuoteAvailability != quoteStep) {
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
        if (quoteNo) setQuoteId(quoteNo);
    }, [quoteNo]);

    useLayoutEffect(() => {
        setTimeout(() => {
            dispatch({ type: CLEAR_QUOTE_DATA });
            dispatch({ type: CLEAR_SURVEY_DATA });
            setQuoteId('');
        }, 100);
    }, []);

    useEffect(() => {
        if (quoteStep == QuoteSteps.SubmitQuote) {
            history.push('/file-upload');
        }
    }, [quoteStep]);

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
    }, [expiresOn]);

    useEffect(() => {
        if (errorMessage) setHasError(true);
    }, [errorMessage]);

    return (
        <>
            <Header />
            <Home
                onQuoteChange={(val: string) => {
                    if (val) {
                        val = val.replace(/[^0-9]/g, '');
                        if (val.length > 6) {
                            val = val.substring(0, 6);
                        }
                    }
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
