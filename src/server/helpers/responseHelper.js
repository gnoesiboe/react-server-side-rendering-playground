/**
 * @param {Object} routerContext
 *
 * @returns {Number}
 */
export function determineStatusCodeForRouteContext(routerContext) {
    if (typeof routerContext.notFound !== 'undefined' && routerContext.notFound === true) {
        return 404;
    }

    return 200;
}

/**
 * @param {Object} routerContext
 *
 * @returns {Boolean}
 */
export function determineIsRedirectRouterContext(routerContext) {
    return routerContext.action !== 'undefined' && routerContext.action === 'REPLACE' && routerContext.url !== 'undefined' && routerContext.url.length > 0;
}
