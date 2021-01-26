import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import userReducer from './reducers/userReducer';
import thunk from 'redux-thunk';
import sharedReducer from './reducers/sharedReducer';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const persistConfig = {
    key: 'user',
    storage,
    whitelist: ['user'],
    stateReconciler: autoMergeLevel2,
};

const rootReducer: any = combineReducers({ user: userReducer, shared: sharedReducer });

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
