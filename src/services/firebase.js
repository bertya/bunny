import * as firebase from 'firebase';
import config from '../fbconfig';

const fbService = firebase.initializeApp(config);

export default fbService;