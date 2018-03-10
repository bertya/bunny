import fb from './firebase';
import * as firebase from 'firebase';

const db = fb.database();

const commentsService = {
  fetchComments,
  createComment,
};

function fetchComments(postId, lineNumber) {
  return db.ref(`/comments/${postId}/${lineNumber}`).once('value');
}

function createComment(postId,lineNumber,values, user, cb) {
  const newCommentRef = db.ref(`/comments/${postId}/${lineNumber}`).push();
  values.timestamp = firebase.database.ServerValue.TIMESTAMP;
  values.user = {};
  values.user.name = user.displayName;
  values.user.email = user.email;
  const request = newCommentRef.set(values).then(()=>cb());

  // update comments counter
  return db.ref(`/posts/${postId}/comments/`).once('value').then((data)=>{
    let commentData = data.val();
    let postData = {};
    if (commentData == undefined) {
      postData[lineNumber] = 1;
    } else if (commentData[lineNumber] == undefined) {
      postData = commentData;
      postData[lineNumber] = 1;
    } else {
      postData = commentData;
      postData[lineNumber]++;
    }
    let updates = {};
    updates[`/posts/${postId}/comments/`] = postData;
    firebase.database().ref().update(updates);

    return db.ref(`/posts/${postId}`).once('value');
  });

  // return request;
}

function fetchGeneralComments() {

}

function createGeneralComment() {
  
}


export default commentsService;