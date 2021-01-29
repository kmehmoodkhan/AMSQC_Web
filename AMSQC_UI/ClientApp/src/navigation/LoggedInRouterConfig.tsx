import React from 'react';
import { Route } from 'react-router-dom';
import { COMPONENTS, ROUTES } from './constants';

export default function LoggedInRouterConfig() {
    return (
        <>
            <Route exact path={ROUTES.FILE_UPLOAD_URL} component={COMPONENTS.FileUpload} />
        </>
    );
}
