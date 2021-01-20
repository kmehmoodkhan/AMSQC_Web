import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import userReducer from './reducers/userReducer';
import thunk from 'redux-thunk';
import sharedReducer from './reducers/sharedReducer';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const rootReducer = combineReducers({ user: userReducer, shared: sharedReducer });

// Redux DevTools
const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof rootReducer>;

export default store;
