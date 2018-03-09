import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import PostReducer from './reducer_posts';
import UserReducer from './reducer_auth';
import CommentsReducer from './reducer_comments';

const rootReducer = combineReducers({
  posts: PostReducer,
  authedUser: UserReducer,
  comments: CommentsReducer,
  form: formReducer
});

export default rootReducer;