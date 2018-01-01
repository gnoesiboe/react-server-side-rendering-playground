import 'babel-polyfill';
import express from 'express';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';
import { matchRoutes } from 'react-router-config';
import routes from './../shared/router/routes';
import proxy from 'express-http-proxy'
import morgan from 'morgan';
import { getConfig } from "../shared/config";
import { determineIsRedirectRouterContext, determineStatusCodeForRouteContext } from "./helpers/responseHelper";
import { isDebugEnvironment } from "../shared/helper/environmentHelper";

var app = express();

app.use(express.static('public'));
app.use(morgan('combined'));

// noinspection JSUnusedGlobalSymbols
app.use(
    getConfig('api.proxyBaseUrl'),
    proxy('http://react-ssr-api.herokuapp.com', {
        proxyReqOptDecorator(options) {

            // makes sure that the OAuth request is forwarded to localhost:3000 afterwards, and not to the
            // heroku api (as we are using this proxy for authentication also)
            options.headers['x-forwarded-host'] = 'localhost:3000';

            return options;
        }
    })
);

app.get('*', (request, response) => {
    var store = createStore(request),
        path = request.path;

    var promises = matchRoutes(routes, path).map(({ route }) => {
        if (typeof route.loadData === 'undefined') {
            return null;
        }

        // wrap our load data promises in another promise that always resolves, to enable us to use Promise.all below
        // without having an error break the chain
        return new Promise((resolve) => {
            route.loadData(store).then(resolve).catch(resolve);
        });
    });

    Promise.all(promises)
        .then(() => {
            var routerContext = {};

            var body = renderer(path, store, routerContext);

            // if url is provided, a redirect is initiated during the rendering proces
            if (determineIsRedirectRouterContext(routerContext)) {
                return response.redirect(301, routerContext.url);
            }

            response.status(
                determineStatusCodeForRouteContext(routerContext)
            );

            response.send(body);
        })
        .catch((error) => {
            response.status(500).send('Something went wrong' + (isDebugEnvironment() ? ': ' + error.toString() : ''));
        });
});

app.listen(3000, () => {
    console.log(`[${process.env.NODE_ENV}] listening on port 3000..`);
});
