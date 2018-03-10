import * as firebase from 'firebase';
import config from '../config';

const fbService = firebase.initializeApp(config);

export default fbService;