import React from 'react';
import { Route } from 'react-router-dom';
import { COMPONENTS, ROUTES } from './constants';

export default function LoggedInRouterConfig() {
    return (
        <>
            <Route exact path={ROUTES.FILE_UPLOAD_URL} component={COMPONENTS.FileUpload} />
            <Route exact path={ROUTES.DAMAGE_TYPE} component={COMPONENTS.DamageType} />
            <Route exact path={ROUTES.CATEGORY_ONE} component={COMPONENTS.CategoryOne} />
        </>
    );
}
