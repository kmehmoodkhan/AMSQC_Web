import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouterConfig from './navigation/RouterConfig';
import { Provider } from 'react-redux';
import store from './redux/store';

export default function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <RouterConfig />
            </BrowserRouter>
        </Provider>
    );
}