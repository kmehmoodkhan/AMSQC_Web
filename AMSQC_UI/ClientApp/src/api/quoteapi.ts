import { axiosGet } from './apiutils';
import { Endpoints } from './endpoints';

export const SubmitQuote = (quoteId: string) => {
    const url = Endpoints.QuoteAPI.SubmitQuote + `?quoteNo=${quoteId}`;
    return axiosGet(url);
};
