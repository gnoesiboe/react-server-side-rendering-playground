import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ApiClient from '../../shared/apiClient/apiClient';
import reducers from '../../shared/reducers';
import {getConfig} from "../../shared/config";

export default function(request) {

    // forward our cookie from the request proxy to the api to be able to
    // override the domain limitations on the cookie when authenticating
    var apiClient = ApiClient.createWithForwardedCookie(
        getConfig('api.baseUrl'),
        request
    );

    var middleware = applyMiddleware(
        thunk.withExtraArgument(apiClient)
    );

    return createStore(reducers, {}, middleware);
}
