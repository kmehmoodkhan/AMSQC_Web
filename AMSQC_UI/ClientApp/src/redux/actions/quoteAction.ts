import { axiosGet, axiosPost } from '../../api/apiutils';
import { Endpoints } from '../../api/endpoints';
import { QuoteSteps, RequestStatus } from '../../common/enum';
import { openNotificationWithError } from '../../pages/Shared/Components/notification';
import * as actionType from '../constants/quoteConstants';
import { HIDE_LOADER } from '../constants/sharedConstants';

export const GetQuoteDetails = (quoteNo: string) => (dispatch: any) => {
    const url = Endpoints.QuoteAPI.SubmitQuote + `?quoteNo=${quoteNo}`;
    axiosGet(url)
        .then((response: any) => {
            if (response.data.Success == RequestStatus.Success) {
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

export const UploadMappingSheet = async (mappingSheet: any, quoteNo: string) => {
    const url = Endpoints.QuoteAPI.UploadMappingSheet;
    return axiosPost(url, { MappingSheet: mappingSheet, QuoteId: quoteNo });
};
