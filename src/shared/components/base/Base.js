import React from 'react';
import { renderRoutes } from 'react-router-config';
import Header from './components/Header';
import { createFetchCurrentUserAction } from './../../action/actionFactory';

function Base({ route }){
    return (
        <div>
            <Header />
            <div className="container">
                { renderRoutes(route.routes) }
            </div>
        </div>
    );
}

/**
 * @param {Function} dispatch
 */
function loadData({ dispatch }) {
    return dispatch(
        createFetchCurrentUserAction()
    );
}

export { loadData };
export default Base;
