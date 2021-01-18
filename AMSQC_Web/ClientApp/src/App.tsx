import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouterConfig from './navigation/RouterConfig';
import { Provider } from 'react-redux';
import store from './redux/store';

export default class App extends Component {
    static displayName = App.name;
    baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <RouterConfig />
                </BrowserRouter>
            </Provider>
        );
    }
}
