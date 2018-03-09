import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCv1m9IdevNVB6ePJSZXqiijXZ4fqYdld8',
  authDomain: 'bunny-12489.firebaseapp.com',
  databaseURL: 'https://bunny-12489.firebaseio.com/',
  storageBucket: 'bunny-12489.appspot.com'
};

const fbService = firebase.initializeApp(config);

export default fbService;