import { LOGIN, LOGOUT, UPDATE } from '../actions/action_auth';

export default function(state = {}, action) {
  switch (action.type) {
  case LOGIN:
    return action.payload.user;
  case LOGOUT:
    return null;
  case UPDATE:
    return action.payload;
  default:
    return state;
  }
}