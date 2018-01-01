import React from 'react';
import Home from '../../shared/components/base/components/Home';
import UsersList, { loadData as usersListLoadData } from '../../shared/components/base/components/UsersList';
import Base, { loadData as baseLoadData } from '../../shared/components/base/Base';
import AdminsList, { loadData as adminsListLoadData } from '../../shared/components/base/components/AdminsList';
import NotFound from '../../shared/components/base/components/NotFound';
import * as urlGenerator from '../../shared/router/urlGenerator';

export default [
    {
        component: Base,
        loadData: baseLoadData,
        routes: [
            {
                path: urlGenerator.createHomePath(),
                component: Home,
                exact: true
            },
            {
                loadData: adminsListLoadData,
                path: urlGenerator.createAdminsPath(),
                component: AdminsList
            },
            {
                loadData: usersListLoadData,
                path: urlGenerator.createUsersPath(),
                component: UsersList
            },
            {
                component: NotFound
            }
        ]
    }
];
