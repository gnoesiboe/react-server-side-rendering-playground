import { isObject } from 'lodash';

/**
 * @param {String} path
 * @param {Object} theObject
 *
 * @returns {Boolean}
 */
export function checkPathExists(path, theObject) {
    var pathParts = path.split('.'),
        firstPathPart = pathParts.shift();

    if (!isObject(theObject) || typeof theObject[firstPathPart] === 'undefined') {
        return false;
    }

    return pathParts.length === 0
        ? true
        : checkPathExists(pathParts.join('.'), theObject[firstPathPart]);
}

/**
 * @param {String} path
 * @param {Object} theObject
 * @param {String} errorMessageIfNotExists
 *
 * @returns {*}
 */
export function extractPathOrThrowIfNotExists(path, theObject, errorMessageIfNotExists) {
    var pathParts = path.split('.'),
        firstPathPart = pathParts.shift();

    if (!isObject(theObject) || typeof theObject[firstPathPart] === 'undefined') {
        throw new Error(errorMessageIfNotExists);
    }

    return pathParts.length === 0
        ? theObject[firstPathPart]
        : extractPathOrThrowIfNotExists(pathParts.join('.'), theObject[firstPathPart], errorMessageIfNotExists);
}

/**
 * @param {String} path
 * @param {Object} theObject
 * @param {*=} defaultValue
 *
 * @returns {*}
 */
export function extractPath(path, theObject, defaultValue = null) {
    var pathParts = path.split('.'),
        firstPathPart = pathParts.shift();

    if (!isObject(theObject) || typeof theObject[firstPathPart] === 'undefined') {
        return defaultValue;
    }

    return pathParts.length === 0
        ? theObject[firstPathPart]
        : extractPathOrThrowIfNotExists(pathParts.join('.'), theObject[firstPathPart], defaultValue);
}
