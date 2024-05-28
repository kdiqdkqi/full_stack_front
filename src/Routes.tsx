import React from 'react';

import { Routes as ReactRoutes, Route, Navigate } from 'react-router-dom';

import Users from './views/Users';
import UserDetails from './views/UserDetails';

const Routes = (): JSX.Element => {
    return (
        <ReactRoutes>
            <Route 
                path="/users"
                element={<Users />}
            />
            <Route 
                path="/users/:id"
                element={<UserDetails />}
            />
            <Route 
                path="/"
                element={<Navigate replace to="/users"  />}
            />
        </ReactRoutes>
    );
}

export default Routes;
