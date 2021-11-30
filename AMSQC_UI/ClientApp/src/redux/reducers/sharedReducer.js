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
var sharedConstants_1 = require("../constants/sharedConstants");
var defaultState = {
    loading: false,
    error: null,
    errorMessage: '',
    goToNext: false,
    forceLogout: false,
};
var sharedReducer = function (state, action) {
    if (state === void 0) { state = defaultState; }
    switch (action.type) {
        case sharedConstants_1.SHOW_LOADER:
            return __assign(__assign({}, state), { loading: true });
        case sharedConstants_1.HIDE_LOADER:
            return __assign(__assign({}, state), { loading: false });
        case sharedConstants_1.SHOW_NOTIFICATION:
            return __assign(__assign({}, state), { loading: false, error: action.error });
        case sharedConstants_1.SET_ERROR_MESSAGE:
            return __assign(__assign({}, state), { errorMessage: action.errorMessage });
        case sharedConstants_1.SET_GO_NEXT:
            return __assign(__assign({}, state), { goToNext: action.goToNext });
        case sharedConstants_1.FORCE_LOG_OUT:
            return __assign(__assign({}, state), { forceLogout: true });
        case sharedConstants_1.RESET_LOG_OUT:
            return __assign(__assign({}, state), { forceLogout: false });
        default:
            return state;
    }
};
exports.default = sharedReducer;
//# sourceMappingURL=sharedReducer.js.map