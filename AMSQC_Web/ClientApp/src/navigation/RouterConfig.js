import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ROUTES, COMPONENTS } from './constants';

const RouterConfig = () => {
    return (
        <Switch>
            <Route exact path={ROUTES.ROOT_URL} component={COMPONENTS.Home} />
        </Switch>
    );
};

export default RouterConfig;
