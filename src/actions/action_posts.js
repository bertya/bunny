import postsService from "../services/service_posts";

export const FETCH_POSTS = "fetch_posts";
export const CREATE_POST = "create_post";
export const FETCH_POST = "fetch_post";
export const UPDATE_POST_READED = "update_post_readed";

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

export function updatePostReaded(id, num) {
  return {
    type: UPDATE_POST_READED,
    payload: postsService.updateReaded(id, num)
  };
}
