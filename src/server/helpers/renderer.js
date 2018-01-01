import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './../../shared/router/routes';
import { Provider } from 'react-redux';
import serialize from 'serialize-javascript';
import { Helmet } from 'react-helmet';

/**
 * @param {String} path
 * @param {Object} store
 * @param {Object} routerContext
 *
 * @returns {String}
 */
export default function (path, store, routerContext) {
    var content = renderToString(
        <Provider store={ store }>
            <StaticRouter location={ path } context={ routerContext }>
                <div>{ renderRoutes(routes) }</div>
            </StaticRouter>
        </Provider>
    );

    // use serialize to escape html and script tags in json (XSS attacks)
    var serializedStoreState = serialize(store.getState());

    // get SEO / sharing values
    var helmet = Helmet.renderStatic();

    return `
        <html>
            <head>
                ${ helmet.title.toString() }
                ${ helmet.meta.toString() }
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css"/>
            </head>
            <body>
                <div id="js-app-root">${content}</div>
                <script type="text/javascript">
                    window.INITIAL_STORE_STATE = ${ serializedStoreState }
                </script>
                <script src="bundle.js"></script>
            </body>
        </html>
    `;
}
