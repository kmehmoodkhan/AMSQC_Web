"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var enum_1 = require("../../common/enum");
var quoteConstants_1 = require("../constants/quoteConstants");
var defaultState = {
    quoteDetails: null,
    quoteNo: '',
    alreadySubmitted: false,
    quoteStep: enum_1.QuoteSteps.GetQuoteDetail,
    quoteId: 0,
    mappingSheetUploaded: false,
    mappingSheetPath: '',
};
var quoteReducer = function (state, action) {
    if (state === void 0) { state = defaultState; }
    switch (action.type) {
        case quoteConstants_1.GET_QUOTE_DETAILS:
            return __assign(__assign({}, state), { quoteNo: action.quoteNo, quoteDetails: action.quoteDetails, quoteStep: action.quoteStep });
        case quoteConstants_1.IS_QUOTE_AVAILABLE:
            return __assign(__assign({}, state), { alreadySubmitted: action.alreadySubmitted, quoteStep: action.quoteStep });
        case quoteConstants_1.SET_QUOTE_ID:
            return __assign(__assign({}, state), { quoteId: action.quoteId, mappingSheetPath: action.filePath });
        case quoteConstants_1.CLEAR_QUOTE:
            return __assign(__assign({}, defaultState), { quoteNo: state.quoteNo });
        case quoteConstants_1.CLEAR_QUOTE_DATA:
            return __assign({}, defaultState);
        case quoteConstants_1.MAPPING_UPLOAD:
            return __assign(__assign({}, state), { mappingSheetUploaded: true });
        default:
            return state;
    }
};
exports.default = quoteReducer;
//# sourceMappingURL=quoteReducer.js.map