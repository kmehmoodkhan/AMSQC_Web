import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import userReducer from './reducers/userReducer';
import thunk from 'redux-thunk';
import sharedReducer from './reducers/sharedReducer';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import quoteReducer from './reducers/quoteReducer';
import surveyReducer from './reducers/surveyReducer';
import reportReducer from './reducers/reportReducer';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const persistConfig = {
    key: 'user',
    storage,
    whitelist: ['user', 'quote', 'survey', 'report'],
    stateReconciler: autoMergeLevel2,
};

// const lastAction = (state = null, action: any) => {
//     return action;
// };

const appReducer: any = combineReducers({
    user: userReducer,
    shared: sharedReducer,
    quote: quoteReducer,
    survey: surveyReducer,
    report: reportReducer,
    // lastAction
});

const rootReducer = (state: any, action: any) => {
    if (action.type === 'LOG_OUT') {
        state = undefined;
    }

    return appReducer(state, action);
};

const pReducer = persistReducer(persistConfig, rootReducer);

// Redux DevTools
const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : compose;

const store: any = createStore(pReducer, composeEnhancers(applyMiddleware(thunk)));

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
