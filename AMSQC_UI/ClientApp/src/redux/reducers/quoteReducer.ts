import { QuoteSteps } from '../../common/enum';
import { CLEAR_QUOTE, GET_QUOTE_DETAILS, IS_QUOTE_AVAILABLE, SET_QUOTE_ID } from '../constants/quoteConstants';

type quoteReducerType = {
    carDetails: any;
    quoteNo: string;
    alreadySubmitted: boolean;
    quoteStep: QuoteSteps;
    quoteId: any;
};

const defaultState: quoteReducerType = {
    carDetails: null,
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
        default:
            return state;
    }
};

export default quoteReducer;
