import { axiosFormPost, axiosGet } from '../../api/apiutils';
import { Endpoints } from '../../api/endpoints';
import { QuoteSteps, RequestStatus } from '../../common/enum';
import * as actionType from '../constants/quoteConstants';
import { HIDE_LOADER, SET_ERROR_MESSAGE, SHOW_NOTIFICATION } from '../constants/sharedConstants';
import { SET_REGION } from '../constants/userConstants';

export const SetQuoteId = (quoteId: any, filePath: any) => (dispatch: any) => {
    dispatch({ type: actionType.SET_QUOTE_ID, quoteId: quoteId, filePath: filePath });
};

export const clearQuoteData = () => (dispatch: any) => {
    dispatch({ type: actionType.CLEAR_QUOTE_DATA });
};

export const GetQuoteDetails = (quoteNo: string) => (dispatch: any) => {
    const url = Endpoints.QuoteAPI.SubmitQuote + `?quoteNo=${parseInt(quoteNo)}`;
    axiosGet(url)
        .then((response: any) => {
            if (response.data.status == RequestStatus.Success) {
                dispatch({
                    type: actionType.GET_QUOTE_DETAILS,
                    quoteNo: quoteNo,
                    quoteDetails: response.data.result.quote,
                    quoteStep: QuoteSteps.QuoteAvailability,
                });
            } else {
                dispatch({
                    type: SET_ERROR_MESSAGE,
                    errorMessage: response.data.message,
                });
            }
        })
        .catch((err) =>
            dispatch({ type: SHOW_NOTIFICATION, error: { type: 'error', description: err.message, title: 'Error' } }),
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
                    dispatch({
                        type: SET_ERROR_MESSAGE,
                        errorMessage: 'Sorry! A quote has beed already submitted for this Quote Number',
                    });
                } else {
                    dispatch({
                        type: actionType.IS_QUOTE_AVAILABLE,
                        alreadySubmitted: false,
                        quoteStep: QuoteSteps.SubmitQuote,
                    });
                    dispatch({
                        type: SET_REGION,
                        region: response.data.result.currentUser.region,
                        regionId: response.data.result.currentUser.regionId,
                    });
                }
            } else {
                dispatch({ type: SHOW_NOTIFICATION, error: { type: 'error' } });
            }
        })
        .catch((err) =>
            dispatch({ type: SHOW_NOTIFICATION, error: { type: 'error', description: err.message, title: 'Error' } }),
        )
        .finally(() => dispatch({ type: HIDE_LOADER }));
};

export const UploadMappingSheet = async (mappingSheet: any, quote: any, user: any, region: any, regionId: any) => {
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
    formData.append('QuoteDetail.InsurerName', quote.insurerName);
    formData.append('QuoteDetail.Region', region);
    formData.append('QuoteDetail.RegionId', regionId);
    return axiosFormPost(url, formData);
};
