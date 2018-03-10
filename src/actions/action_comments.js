import commentsService from '../services/service_comments';

export const FETCH_COMMENTS= 'fetch_comments';
export const CREATE_COMMENT = 'create_comment';
export const FETCH_GENERAL_COMMENTS= 'fetch_general_comments';
export const CREATE_GENERAL_COMMENT = 'create_general_comment';

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

export function fetchGeneralComments(id) {
  return {
    type: FETCH_GENERAL_COMMENTS,
    payload: commentsService.fetchComments(id, 'general')
  };
}

export function createGeneralComment(id, values, user, cb) {
  return {
    type: CREATE_GENERAL_COMMENT,
    payload: commentsService.createComment(id, 'general', values, user, cb)
  };
}

