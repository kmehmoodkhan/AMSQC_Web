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
var userConstants_1 = require("../constants/userConstants");
var defaultState = {
    loggedIn: false,
    user: {},
    accessToken: '',
    tokenExpiresOn: null,
    region: '',
    regionId: 0,
};
var userReducer = function (state, action) {
    if (state === void 0) { state = defaultState; }
    switch (action.type) {
        case userConstants_1.SET_USER:
            return {
                loggedIn: true,
                user: __assign({}, action.user.account),
                accessToken: action.user.accessToken,
                tokenExpiresOn: action.user.expiresOn,
                region: '',
                regionId: 0,
            };
        case userConstants_1.SET_REGION:
            return __assign(__assign({}, state), { region: action.region, regionId: action.regionId });
        default:
            return state;
    }
};
exports.default = userReducer;
//# sourceMappingURL=userReducer.js.map