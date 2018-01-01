export const ENVIRONMENT_DEV = 'dev';
export const ENVIRONMENT_PRODUCTION = 'production';
export const ENVIRONMENT_STAGING = 'staging';
export const ENVIRONMENT_TEST = 'test';

const CUSTOMER_ENVIRONMENTS = [
    ENVIRONMENT_STAGING,
    ENVIRONMENT_PRODUCTION
];

const INTERNAL_ENVIRONMENTS = [
    ENVIRONMENT_DEV,
    ENVIRONMENT_TEST
];

const DEBUG_ENVIRONMENT = [
    ENVIRONMENT_DEV,
    ENVIRONMENT_TEST,
    ENVIRONMENT_STAGING
];

var currentEnvironment = process.env.NODE_ENV;

export function getCurrentEnvironment() {
    return currentEnvironment;
}

/**
 * @returns {Boolean}
 */
export function isDevelopmentEnvironment() {
    return currentEnvironment === ENVIRONMENT_DEV;
}

/**
 * @returns {Boolean}
 */
export function isProductionEnvironment() {
    return currentEnvironment === ENVIRONMENT_PRODUCTION;
}

/**
 * @returns {Boolean}
 */
export function isCustomerEnvironment() {
    return CUSTOMER_ENVIRONMENTS.indexOf(currentEnvironment) !== -1; // eslint-disable-line no-magic-numbers
}

/**
 * @returns {Boolean}
 */
export function isInternalEnvironment() {
    return INTERNAL_ENVIRONMENTS.indexOf(currentEnvironment) !== -1; // eslint-disable-line no-magic-numbers
}

/**
 * @returns {Boolean}
 */
export function isDebugEnvironment() {
    return DEBUG_ENVIRONMENT.indexOf(currentEnvironment) !== -1;
}
