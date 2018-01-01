import React from 'react';
import Home from '../../shared/components/base/components/Home';
import Base, { loadData as baseLoadData } from '../../shared/components/base/Base';
import AdminsList, { loadData as adminsListLoadData } from '../../shared/components/base/components/AdminsList';
import NotFound from '../../shared/components/base/components/NotFound';
import * as urlGenerator from '../../shared/router/urlGenerator';
import LazyLoadingComponentTree from './../components/base/components/LazyLoadingComponentTree';

var usersListProvider = () => import(/* webpackChunkName: "users_list" */ '../../shared/components/base/components/UsersList');

/*

Ik loop tegen het volgende probleem aan als ik op de server geen lazy loading gebruik:

* daar wordt de lijst met gebruikers volledig gerenderd op de server
* zodra je op de client bent, wordt dit echter weggegooid, en wordt een preloader weergeven, omdat het component nog gelazyload moet worden
* dit zorgt ook voor een Error omdat de gegenereerde HTML op de server niet overeenkomt met die op de client
* dit zorgt er ook voor dat de gebruikers eerst weergegeven worden, daarna kort vervangen worden door een loader, en daarna weer weergegeven worden

*/

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
                // it is not possible to preload data using the 'loadData' functionality, as the component has not yet been loaded
                path: urlGenerator.createUsersPath(),
                component: () => <LazyLoadingComponentTree moduleProvider={ usersListProvider }/>
            },
            {
                component: NotFound
            }
        ]
    }
];
