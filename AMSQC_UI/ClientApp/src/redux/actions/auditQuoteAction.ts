import { axiosGet, axiosPost } from '../../api/apiutils';
import { Endpoints } from '../../api/endpoints';
import { QuoteSteps, RequestStatus } from '../../common/enum';
import * as actionType from '../constants/auditQuoteConstant';
import { HIDE_LOADER, SET_ERROR_MESSAGE, SHOW_NOTIFICATION } from '../constants/sharedConstants';


export const SetQuoteId = (quoteId: any) => (dispatch: any) => {
    dispatch({ type: actionType.SET_AUDIT_QUOTE_ID, quoteId: quoteId });
};

export const clearQuoteData = () => (dispatch: any) => {
    dispatch({ type: actionType.CLEAR_AUDIT_QUOTE_ID });
};

export const GetAuditQuoteDetails = (quoteNo: string) => (dispatch: any) => {
    const url = Endpoints.QuoteAPI.AuditQuote + `?quoteNo=${parseInt(quoteNo)}`;
    
    axiosGet(url)
        .then((response: any) => {
            console.log('Quote Details=>', response.data);

            if (response.data.status == RequestStatus.Success) {
                dispatch({
                    type: actionType.GET_AUDIT_QUOTE_DETAILS,
                    quoteNo: quoteNo,
                    quoteDetails: response.data.result.quoteDetail,
                    quoteStep: QuoteSteps.GetQuoteDetail,
                    quoteDetailId: response.data.result.quoteDetail.quoteDetailId,
                });
            } else {
                dispatch({
                    type: actionType.CLEAR_AUDIT_QUOTE_ID,
                });
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


export const UpdateAuditQuoteDetails = (quoteDetailId: number) => (dispatch: any) => {
    
    const url = Endpoints.ReportAPI.AuditQuote + `?quoteDetailId=${quoteDetailId}`;

    axiosPost(url, {
        quoteDetailId: quoteDetailId,
        })
        .then((response: any) => {
            console.log('Quote Details=>', quoteDetailId);

            if (response.data.status == RequestStatus.Success) {
                dispatch({
                    type: actionType.SET_AUDIT_QUOTE_ID,
                    quoteDetails: response.data.result.quote,
                    quoteStep: QuoteSteps.SubmitQuote,
                });

                dispatch({
                    type: SHOW_NOTIFICATION,
                    error: {
                        type: RequestStatus.Success == response.data.status ? 'success' : 'error',
                        description: response.data.message,
                        title: '',
                    },
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
