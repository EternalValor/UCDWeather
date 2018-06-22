import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCu-8EsWRWI4sT1nNqaBNFrWQZ-O7t7vk4",
  authDomain: "ucd-weather-1529436761763.firebaseapp.com",
  databaseURL: "https://ucd-weather-1529436761763.firebaseio.com",
  projectId: "ucd-weather-1529436761763",
  storageBucket: "ucd-weather-1529436761763.appspot.com",
  messagingSenderId: "773789144249"
}

const fire = firebase.initializeApp(config);
export default fire;