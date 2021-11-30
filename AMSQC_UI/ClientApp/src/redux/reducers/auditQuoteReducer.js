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
var auditQuoteConstant_1 = require("../constants/auditQuoteConstant");
var defaultState = {
    quoteDetails: null,
    quoteNo: '',
    quoteId: 0,
    quoteDetailId: 0,
};
var auditQuoteReducer = function (state, action) {
    if (state === void 0) { state = defaultState; }
    switch (action.type) {
        case auditQuoteConstant_1.GET_AUDIT_QUOTE_DETAILS:
            return __assign(__assign({}, state), { quoteNo: action.quoteNo, quoteDetails: action.quoteDetails, quoteDetailId: action.quoteDetails.quoteDetailId });
        case auditQuoteConstant_1.SET_AUDIT_QUOTE_ID:
            return __assign(__assign({}, state), { quoteId: action.quoteId });
        case auditQuoteConstant_1.CLEAR_AUDIT_QUOTE_ID:
            return __assign({}, defaultState);
        default:
            return state;
    }
};
exports.default = auditQuoteReducer;
//# sourceMappingURL=auditQuoteReducer.js.map