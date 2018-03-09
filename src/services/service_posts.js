import fb from './firebase';

const db = fb.database();

const postsService = {
  getPosts,
  createPost,
  fetchPost
};


function getPosts() {
  return db.ref('/posts/').once('value');
}

function createPost(values,user, cb) {
  const newPostRef = db.ref('posts/').push();
  // values.commentsCounter = {};
  values.user = {};
  values.user.uid = user.uid;
  values.user.name = user.displayName;
  values.user.email = user.email;

  const request = newPostRef.set(values).then(()=>cb(newPostRef.key));
  return request;
}

function fetchPost(id) {
  return db.ref(`/posts/${id}`).once('value');
}

export default postsService;