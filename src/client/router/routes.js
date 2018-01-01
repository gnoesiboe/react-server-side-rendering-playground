import React from 'react';
import Home from '../../shared/components/base/components/Home';
import Base, { loadData as baseLoadData } from '../../shared/components/base/Base';
import AdminsList, { loadData as adminsListLoadData } from '../../shared/components/base/components/AdminsList';
import NotFound from '../../shared/components/base/components/NotFound';
import * as urlGenerator from '../../shared/router/urlGenerator';
import LazyLoadingComponentTree from "../../shared/components/base/components/LazyLoadingComponentTree";

var usersListProvider = () => import(/* webpackChunkName: "users_list" */ '../../shared/components/base/components/UsersList');

/*

Ik loop tegen het volgende probleem aan:

* Op de server gebruik ik geen lazy loading
* daar wordt de lijst met gebruikers volledig gerenderd
* zodra je op de client bent, wordt dit echter weggegooid, en woredt een preloader weergeven, omdat het component nog gelazyload moet worden
* dit zorgt ook voor een Error omdat de gegenereerde HTML op de server niet overeenkomt met die op de client

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
                path: urlGenerator.createUsersPath(),
                component: () => <LazyLoadingComponentTree moduleProvider={ usersListProvider }/>
            },
            {
                component: NotFound
            }
        ]
    }
];
