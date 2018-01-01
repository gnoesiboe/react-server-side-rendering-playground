import { combineReducers } from 'redux';
import usersReducer from './reducer/usersReducer';
import currentUserReducer from './reducer/currentUserReducer';
import adminsReducer from './reducer/adminsReducer';

export default combineReducers({
    users: usersReducer,
    currentUser: currentUserReducer,
    admins: adminsReducer
});
