import fb from "./firebase";
import * as firebase from "firebase";

const db = fb.database();
const storageRef = fb.storage().ref();

const postsService = {
  getPosts,
  createPost,
  fetchPost,
  updateReaded
};

function getPosts() {
  return db.ref("/posts/").once("value");
}

function createPost(values, audioBlob, user, cb) {
  const newPostRef = db.ref("posts/").push();
  // values.commentsCounter = {};
  values.user = {};
  values.user.uid = user.uid;
  values.user.name = user.displayName;
  values.user.email = user.email;

  let request;

  if (audioBlob !== null) {
    let fileRef = storageRef.child(`audio/${newPostRef.key}.webm`);
    request = fileRef
      .put(audioBlob.blob)
      .then(snapshot => {
        values.audioUrl = snapshot.downloadURL;
        return newPostRef.set(values);
      })
      .then(() => {
        let userData = {};
        userData.commentsTotal = 0;
        userData.commentsRead = 0;
        userData.title = values.title;
        userData.postID = newPostRef.key;
        const newUserPostEntryRef = db.ref(`/user/${user.uid}/posts/`).push();
        return newUserPostEntryRef.set(userData);
      })
      .then(() => {
        cb(newPostRef.key);
      });
  } else {
    request = newPostRef
      .set(values)
      .then(() => {
        let userData = {};
        userData.commentsTotal = 0;
        userData.commentsRead = 0;
        userData.title = values.title;
        userData.postID = newPostRef.key;
        const newUserPostEntryRef = db.ref(`/user/${user.uid}/posts/`).push();
        return newUserPostEntryRef.set(userData);
      })
      .then(() => {
        cb(newPostRef.key);
      });
  }

  return request;
}

function fetchPost(id) {
  return db.ref(`/posts/${id}`).once("value");
}

function updateReaded(id, num) {
  let updates = {};
  updates[`/posts/${id}/user/readed`] = num;
  firebase
    .database()
    .ref()
    .update(updates);
  return db.ref(`/posts/${id}`).once("value");
}

export default postsService;
