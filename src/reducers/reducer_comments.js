import { FETCH_COMMENTS } from '../actions/action_comments';

export default function(state = {}, action) {
  switch (action.type) {
  case FETCH_COMMENTS:
    return action.payload.val();
  default:
    return state;
  }
}