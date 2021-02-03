import { axiosFormPost, axiosGet } from '../../api/apiutils';
import { Endpoints } from '../../api/endpoints';
import { QuoteSteps, RequestStatus } from '../../common/enum';
import { openNotificationWithError } from '../../pages/Shared/Components/notification';
import * as actionType from '../constants/quoteConstants';
import { HIDE_LOADER } from '../constants/sharedConstants';

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
                        alreadySubmitted: true,
                        quoteStep: QuoteSteps.GetQuoteDetail,
                    });
                } else {
                    dispatch({
                        type: actionType.GET_QUOTE_DETAILS,
                        quoteNo: quoteNo,
                        carDetails: response.data.result.quote,
                        alreadySubmitted: false,
                        quoteStep: QuoteSteps.SubmitQuote,
                    });
                }
            } else {
                openNotificationWithError();
            }
        })
        .catch((err) => openNotificationWithError(err, 'Error'))
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
    return axiosFormPost(url, formData);
};
