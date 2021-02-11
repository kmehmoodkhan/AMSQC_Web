import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouterConfig from './navigation/RouterConfig';
import { Provider } from 'react-redux';
import store from './redux/store';
import ErrorComponent from './pages/Shared/Components/ErrorComponent';
import TokenRefreshContainer from './pages/Shared/Containers/TokenRefreshContainer';

export default function App() {
    return (
        <Provider store={store}>
            <ErrorComponent />
            <TokenRefreshContainer />
            <BrowserRouter>
                <RouterConfig />
            </BrowserRouter>
        </Provider>
    );
}
