import { FETCH_ADMINS } from '../action/type';

/**
 * @param {Object[]} currentState
 * @param {Object} action
 *
 * @returns {Object[]}
 */
export default function (currentState = [], action) {
    switch (action.type) {
        case FETCH_ADMINS:
            return action.payload.data;

        default:
            return currentState;
    }
}
