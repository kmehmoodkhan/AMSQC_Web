import { axiosGet } from './apiutils';
import { QuoteAPI } from './endpoints';

export const SubmitQuote = (quoteId: string) => {
    const url = QuoteAPI.SubmitQuote + `?quoteNo=${quoteId}`;
    return axiosGet(url);
};
