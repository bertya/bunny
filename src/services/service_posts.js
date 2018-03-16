import fb from './firebase';

const db = fb.database();
const storageRef = fb.storage().ref();

const postsService = {
  getPosts,
  createPost,
  fetchPost
};


function getPosts() {
  return db.ref('/posts/').once('value');
}

function createPost(values, audioBlob, user, cb) {
  const newPostRef = db.ref('posts/').push();
  // values.commentsCounter = {};
  values.user = {};
  values.user.uid = user.uid;
  values.user.name = user.displayName;
  values.user.email = user.email;

  // const request = newPostRef.set(values).then(()=>cb(newPostRef.key));
  // const request = newPostRef.set(values).then(()=>{
  //   if (audioBlob !== null) {
  //     let fileRef = storageRef.child(`audio/${newPostRef.key}.webm`);
  //     return fileRef.put(audioBlob.blob);
  //   } else {
  //     return;
  //   }
  // }).then((sss)=>{
  //   console.log(sss);
  //   cb(newPostRef.key);
  // });

  let request;

  if (audioBlob !== null) {
    let fileRef = storageRef.child(`audio/${newPostRef.key}.webm`);
    request = fileRef.put(audioBlob.blob)
      .then((snapshot) => {
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
    request = newPostRef.set(values)
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
  return db.ref(`/posts/${id}`).once('value');
}

export default postsService;