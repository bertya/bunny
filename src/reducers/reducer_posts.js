import {
  FETCH_POSTS,
  FETCH_POST,
  UPDATE_POST_READED
} from "../actions/action_posts";
import { CREATE_COMMENT } from "../actions/action_comments";
import _ from "lodash";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS:
      // return _.map(_.values(action.payload.val()));
      return action.payload.val();
    case FETCH_POST:
      // let newState = _.assign(state, action.payload.val());
      // console.log(action.payload);
      return { ...state, [action.payload.key]: action.payload.val() };
    case CREATE_COMMENT:
      return { ...state, [action.payload.key]: action.payload.val() };
    case UPDATE_POST_READED:
      return { ...state, [action.payload.key]: action.payload.val() };
    default:
      return state;
  }
}
