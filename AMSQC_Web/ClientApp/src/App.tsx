import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouterConfig from './navigation/RouterConfig';
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <RouterConfig />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
}
