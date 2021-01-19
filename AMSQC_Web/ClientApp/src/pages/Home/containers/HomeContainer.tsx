import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { SubmitQuote } from '../../../api/quoteapi';
import { logIn } from '../../../azure/azure-authentication-service';
import { RootState } from '../../../redux/store';
import Header from '../components/Header';
import Home from '../components/Home';

export default function HomeContainer() {
    const [quoteId, setQuoteId] = useState('');

    const loggedIn = useSelector((state: RootState) => state.user.loggedIn);

    const onSubmit = () => {
        if (loggedIn) {
            if (quoteId && quoteId.length > 0) {
                SubmitQuote(quoteId)
                    .then((response) => {
                        console.log(response.data);
                    })
                    .catch((err) => console.log(err));
            }
        } else {
            logIn('loginPopup');
        }
    };

    return (
        <>
            <Header />
            <Home onQuoteChange={(val: string) => setQuoteId(val)} quoteId={quoteId} onSubmit={onSubmit} />
        </>
    );
}
