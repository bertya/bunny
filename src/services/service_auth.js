import fb from './firebase';
import * as firebase from 'firebase';

const googleProvider = new firebase.auth.GoogleAuthProvider();

const authService = {
  login,
  logout,
  isLoggedIn,
  watch
};


function login() {
  return fb.auth().signInWithPopup(googleProvider);
}

function logout() {
  return fb.auth().signOut();
}

function isLoggedIn() {
  let user = fb.auth().currentUser;

  return user ? true : false;
}

function watch(cb) {
  fb.auth().onAuthStateChanged(cb);
}

export default authService;