import commentsService from '../services/service_comments';

export const FETCH_COMMENTS= 'fetch_comments';
export const CREATE_COMMENT = 'create_comment';

export function fetchComments(id, line) {
  return {
    type: FETCH_COMMENTS,
    payload: commentsService.fetchComments(id, line)
  };
}

export function createComment(id, line, values, user, cb) {
  return {
    type: CREATE_COMMENT,
    payload: commentsService.createComment(id, line, values, user, cb)
  };
}

