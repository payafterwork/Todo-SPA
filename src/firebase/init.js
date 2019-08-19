import firebase from 'firebase'
import firestore from 'firebase/firestore'
// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBnDgFcs7GBgo960GqXh3lb_juIyqds6V8",
    authDomain: "vuecrud-717cd.firebaseapp.com",
    databaseURL: "https://vuecrud-717cd.firebaseio.com",
    projectId: "vuecrud-717cd",
    storageBucket: "vuecrud-717cd.appspot.com",
    messagingSenderId: "549962737474",
    appId: "1:549962737474:web:c0a22c2a877d914b"
  };
  // Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)
export default firebaseApp.firestore()
