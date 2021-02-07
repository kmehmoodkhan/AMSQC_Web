import { QuoteSteps } from '../../common/enum';
import {
    CLEAR_QUOTE,
    CLEAR_QUOTE_DATA,
    GET_QUOTE_DETAILS,
    IS_QUOTE_AVAILABLE,
    SET_QUOTE_ID,
} from '../constants/quoteConstants';

type quoteReducerType = {
    quoteDetails: any;
    quoteNo: string;
    alreadySubmitted: boolean;
    quoteStep: QuoteSteps;
    quoteId: any;
};

const defaultState: quoteReducerType = {
    quoteDetails: null,
    quoteNo: '',
    alreadySubmitted: false,
    quoteStep: QuoteSteps.GetQuoteDetail,
    quoteId: 0,
};

const quoteReducer = (state = defaultState, action: any): quoteReducerType => {
    switch (action.type) {
        case GET_QUOTE_DETAILS:
            return {
                ...state,
                quoteNo: action.quoteNo,
                quoteDetails: action.quoteDetails,
                quoteStep: action.quoteStep,
            };
        case IS_QUOTE_AVAILABLE:
            return {
                ...state,
                alreadySubmitted: action.alreadySubmitted,
                quoteDetails: action.alreadySubmitted ? null : state.quoteDetails,
                quoteStep: action.quoteStep,
            };
        case SET_QUOTE_ID:
            return {
                ...state,
                quoteId: action.quoteId,
            };
        case CLEAR_QUOTE:
            return {
                ...defaultState,
                quoteNo: state.quoteNo,
            };
        case CLEAR_QUOTE_DATA:
            return defaultState;
        default:
            return state;
    }
};

export default quoteReducer;
