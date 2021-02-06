import { axiosFormPost, axiosGet } from '../../api/apiutils';
import { Endpoints } from '../../api/endpoints';
import { QuoteSteps, RequestStatus } from '../../common/enum';
import * as actionType from '../constants/quoteConstants';
import { HIDE_LOADER, SHOW_NOTIFICATION } from '../constants/sharedConstants';

export const GetQuoteDetails = (quoteNo: string) => (dispatch: any) => {
    const url = Endpoints.QuoteAPI.SubmitQuote + `?quoteNo=${parseInt(quoteNo)}`;
    axiosGet(url)
        .then((response: any) => {
            if (response.data.status == RequestStatus.Success) {
                if (response.data.result.alreadySubmitted) {
                    dispatch({
                        type: actionType.GET_QUOTE_DETAILS,
                        quoteNo: quoteNo,
                        carDetails: null,
                        quoteStep: QuoteSteps.GetQuoteDetail,
                    });
                } else {
                    dispatch({
                        type: actionType.GET_QUOTE_DETAILS,
                        quoteNo: quoteNo,
                        carDetails: response.data.result.quote,
                        quoteStep: QuoteSteps.QuoteAvailability,
                    });
                }
            } else {
                dispatch({ type: SHOW_NOTIFICATION, error: { type: 'error' } });
            }
        })
        .catch((err) =>
            dispatch({ type: SHOW_NOTIFICATION, error: { type: 'error', description: err, title: 'Error' } }),
        )
        .finally(() => dispatch({ type: HIDE_LOADER }));
};

export const GetQuoteAvailable = (quoteId: any, region: string) => (dispatch: any) => {
    const url = Endpoints.QuoteAPI.QuoteAvailable + `?quoteId=${parseInt(quoteId)}&region=${region}`;
    axiosGet(url)
        .then((response: any) => {
            if (response.data.status == RequestStatus.Success) {
                if (response.data.result.alreadySubmitted) {
                    dispatch({
                        type: actionType.IS_QUOTE_AVAILABLE,
                        alreadySubmitted: true,
                        quoteStep: QuoteSteps.GetQuoteDetail,
                    });
                } else {
                    dispatch({
                        type: actionType.IS_QUOTE_AVAILABLE,
                        alreadySubmitted: false,
                        quoteStep: QuoteSteps.SubmitQuote,
                    });
                }
            } else {
                dispatch({ type: SHOW_NOTIFICATION, error: { type: 'error' } });
            }
        })
        .catch((err) =>
            dispatch({ type: SHOW_NOTIFICATION, error: { type: 'error', description: err, title: 'Error' } }),
        )
        .finally(() => dispatch({ type: HIDE_LOADER }));
};

export const UploadMappingSheet = async (mappingSheet: any, quote: any, user: any) => {
    const url = Endpoints.QuoteAPI.UploadMappingSheet;
    const formData = new FormData();
    formData.append('MappingSheet', mappingSheet);
    formData.append('QuoteDetail.QuoteId', quote.quoteId);
    formData.append('QuoteDetail.Company', quote.company);
    formData.append('QuoteDetail.Model', quote.model);
    formData.append('QuoteDetail.Color', quote.color);
    formData.append('QuoteDetail.Registration', quote.registration);
    formData.append('QuoteDetail.UserGuid', user.localAccountId);
    formData.append('QuoteDetail.UserName', user.username);
    formData.append('QuoteDetail.InsurerName', user.insurerName);
    return axiosFormPost(url, formData);
};
