import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouterConfig from './navigation/RouterConfig';
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store';
import ErrorComponent from './pages/Shared/Components/ErrorComponent';
import TokenRefreshContainer from './pages/Shared/Containers/TokenRefreshContainer';
import { PersistGate } from 'redux-persist/integration/react';
import ScreenLoader from './pages/Shared/Components/ScreenLoader';

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={<ScreenLoader />} persistor={persistor}>
                <ErrorComponent />
                <TokenRefreshContainer />
                <BrowserRouter>
                    <RouterConfig />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
}
