import * as actionType from './type';

/**
 * @param {String} type
 * @param {Object} payload
 *
 * @returns {Object}
 *
 * @private
 */
function _createAction(type, payload = {}) {
    return { type, payload }
}

/**
 * @returns {Function}
 */
export function createFetchUsersAction() {
    return async (dispatch, getState, apiClient) => {
        var response = await apiClient.get('/users');

        dispatch(
            _createAction(actionType.FETCH_USERS, response)
        );
    };
}

/**
 * @returns {Function}
 */
export function createFetchCurrentUserAction() {
    return async (dispatch, getState, apiClient) => {
        var response = await apiClient.get('/current_user');

        dispatch(
            _createAction(actionType.FETCH_CURRENT_USER, response)
        );
    }
}

/**
 * @returns {Function}
 */
export function createFetchAdminsAction() {
    return async (dispatch, getState, apiClient) => {
        var response = await apiClient.get('/admins');

        dispatch(
            _createAction(actionType.FETCH_ADMINS, response)
        );
    }
}
