"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.persistor = void 0;
var redux_1 = require("redux");
var userReducer_1 = require("./reducers/userReducer");
var redux_thunk_1 = require("redux-thunk");
var sharedReducer_1 = require("./reducers/sharedReducer");
var storage_1 = require("redux-persist/lib/storage");
var redux_persist_1 = require("redux-persist");
var autoMergeLevel2_1 = require("redux-persist/lib/stateReconciler/autoMergeLevel2");
var quoteReducer_1 = require("./reducers/quoteReducer");
var surveyReducer_1 = require("./reducers/surveyReducer");
var reportReducer_1 = require("./reducers/reportReducer");
var auditQuoteReducer_1 = require("./reducers/auditQuoteReducer");
var persistConfig = {
    key: 'user',
    storage: storage_1.default,
    whitelist: ['user', 'quote', 'survey', 'report', 'auditQuote'],
    stateReconciler: autoMergeLevel2_1.default,
};
// const lastAction = (state = null, action: any) => {
//     return action;
// };
var appReducer = redux_1.combineReducers({
    user: userReducer_1.default,
    shared: sharedReducer_1.default,
    quote: quoteReducer_1.default,
    survey: surveyReducer_1.default,
    report: reportReducer_1.default,
    auditQuote: auditQuoteReducer_1.default
    // lastAction
});
var rootReducer = function (state, action) {
    if (action.type === 'LOG_OUT') {
        state = undefined;
    }
    return appReducer(state, action);
};
var pReducer = redux_persist_1.persistReducer(persistConfig, rootReducer);
// Redux DevTools
var composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : redux_1.compose;
var store = redux_1.createStore(pReducer, composeEnhancers(redux_1.applyMiddleware(redux_thunk_1.default)));
exports.persistor = redux_persist_1.persistStore(store);
exports.default = store;
//# sourceMappingURL=store.js.map