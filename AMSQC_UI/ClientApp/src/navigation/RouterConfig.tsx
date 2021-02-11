import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ROUTES, COMPONENTS } from './constants';
import LoggedInRouterConfig from './LoggedInRouterConfig';

const RouterConfig = () => {
    // Containers
    const LoggedInHeaderContainer = React.lazy(() => import('../pages/Shared/Containers/LoggedInHeaderContainer'));

    return (
        <React.Suspense fallback={<COMPONENTS.ScreenLoader />}>
            <Switch>
                <Route exact path={ROUTES.ROOT_URL} component={COMPONENTS.Home} />
                <Route exact path={ROUTES.LOG_OUT} component={COMPONENTS.LogOut} />
                <LoggedInHeaderContainer>
                    <LoggedInRouterConfig />
                </LoggedInHeaderContainer>
            </Switch>
        </React.Suspense>
    );
};

export default RouterConfig;
