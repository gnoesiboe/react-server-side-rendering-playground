import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import routes from './../shared/router/routes';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from '../shared/reducers';
import ApiClient from "../shared/apiClient/apiClient";
import {getConfig} from "../shared/config";

var apiClient = new ApiClient(
    getConfig('api.proxyBaseUrl')
);

var middleware = applyMiddleware(
    thunk.withExtraArgument(apiClient)
);

var store = createStore(
    reducers,
    window.INITIAL_STORE_STATE,
    middleware
);

ReactDOM.hydrate(
    <Provider store={ store }>
        <BrowserRouter>
            <div>{ renderRoutes(routes) }</div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('js-app-root')
);
