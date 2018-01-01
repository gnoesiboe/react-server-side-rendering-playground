import { FETCH_USERS } from '../action/type'

/**
 * @param {Object[]} currentState
 * @param {Object} action
 *
 * @returns {Object[]}
 */
export default function (currentState = [], action) {
    switch (action.type) {
        case FETCH_USERS:
            return action.payload.data;

        default:
            return currentState;
    }
}
