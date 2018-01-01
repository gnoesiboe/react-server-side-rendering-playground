import { merge } from 'lodash';
import { extractPath } from './helper/objectPathHelper';
import * as environment from './helper/environmentHelper';

const DEFAULT_CONFIG = {
    api: {
        baseUrl: 'http://react-ssr-api.herokuapp.com',
        proxyBaseUrl: '/api'
    }
};

var config = {},
    currentEnvironment = environment.getCurrentEnvironment();

switch (currentEnvironment) {
    case environment.ENVIRONMENT_DEV:
        config = merge(config, DEFAULT_CONFIG, {});
        break;

    default:
        throw new Error(`Environment '${currentEnvironment}' not supported`);
}

/**
 * @param {String} path
 *
 * @param {*=} defaultValue
 *
 * @returns {*}
 */
export function getConfig(path, defaultValue = null) {
    return extractPath(path, config, defaultValue);
}
