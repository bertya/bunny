import postsService from '../services/service_posts';

export const FETCH_POSTS = 'fetch_posts';
export const CREATE_POST = 'create_post';
export const FETCH_POST = 'fetch_post';

export function fetchPosts() {
  return {
    type: FETCH_POSTS,
    payload: postsService.getPosts()
  };
}

export function createPost(values, audioBlob, user, cb) {
  return {
    type: CREATE_POST,
    payload: postsService.createPost(values, audioBlob, user, cb)
  };
}

export function fetchPost(id) {
  return {
    type: FETCH_POST,
    payload: postsService.fetchPost(id)
  };
}
