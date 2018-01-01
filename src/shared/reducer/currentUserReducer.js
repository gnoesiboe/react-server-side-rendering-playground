import { FETCH_CURRENT_USER } from './../action/type';

export default function (currentState = null, action) {
    switch (action.type) {
        case FETCH_CURRENT_USER:
            return action.payload.data || false;

        default:
            return currentState;
    }
}
