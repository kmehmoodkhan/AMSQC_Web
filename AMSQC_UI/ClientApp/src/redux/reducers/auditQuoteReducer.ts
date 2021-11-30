import {
    SET_AUDIT_QUOTE_ID,
    CLEAR_AUDIT_QUOTE_ID,
    GET_AUDIT_QUOTE_DETAILS
} from '../constants/auditQuoteConstant';

type auditQuoteReducerType = {
    quoteDetails: any;
    quoteNo: string;
    quoteId: any;
    quoteDetailId: any;
};

const defaultState: auditQuoteReducerType = {
    quoteDetails: null,
    quoteNo: '',
    quoteId: 0,
    quoteDetailId:0,
};

const auditQuoteReducer = (state = defaultState, action: any): auditQuoteReducerType => {
    switch (action.type) {
        case GET_AUDIT_QUOTE_DETAILS:
            return {
                ...state,
                quoteNo: action.quoteNo,
                quoteDetails: action.quoteDetails,
                quoteDetailId:action.quoteDetails.quoteDetailId,
            };
        case SET_AUDIT_QUOTE_ID:
            return {
                ...state,
                quoteId: action.quoteId,
            };
        case CLEAR_AUDIT_QUOTE_ID:
            return {
                ...defaultState,
            };
        default:
            return state;
    }
};

export default auditQuoteReducer;
