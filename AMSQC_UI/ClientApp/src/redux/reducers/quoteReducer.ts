import { QuoteSteps } from '../../common/enum';
import { GET_QUOTE_DETAILS, IS_QUOTE_AVAILABLE } from '../constants/quoteConstants';

type quoteReducerType = {
    carDetails: any;
    quoteNo: string;
    alreadySubmitted: boolean;
    quoteStep: QuoteSteps;
};

const defaultState: quoteReducerType = {
    carDetails: null,
    quoteNo: '',
    alreadySubmitted: false,
    quoteStep: QuoteSteps.GetQuoteDetail,
};

const quoteReducer = (state = defaultState, action: any): quoteReducerType => {
    switch (action.type) {
        case GET_QUOTE_DETAILS:
            return {
                ...state,
                quoteNo: action.quoteNo,
                carDetails: action.carDetails,
                quoteStep: action.quoteStep,
            };
        case IS_QUOTE_AVAILABLE:
            return {
                ...state,
                alreadySubmitted: action.alreadySubmitted,
                carDetails: action.alreadySubmitted ? null : state.carDetails,
                quoteStep: action.quoteStep,
            };
        default:
            return state;
    }
};

export default quoteReducer;
