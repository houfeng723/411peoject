import firebase from 'firebase';
import uuid from 'uuid';

const config = {
    apiKey: 'AIzaSyDaLeMPD7PfUTw_XOsPbesC5Ki4QiqoRJQ',
    authDomain : 'chatroomsummer.firebaseapp.com',
    databaseURL: 'https://chatroomsummer.firebaseio.com',
    projectId: 'chatroomsummer',
    storageBucket: 'chatroomsummer.appspot.com',
    messagingSenderId: '66517004913'
}

const fetchurl = "https://chatroomsummer.firebaseio.com/housing.json?orderBy=\"user/id\"&equalTo=\"";

 
class FirebaseSDK {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    } else {
      console.log("firebase apps already running...");
    }
  };
  

  checkLoggedIn = (success, failed) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("hi");
        success.call();
      } else {

        console.log("sad");
        failed();
      }
  });}

  login = async(user, success_callback, failed_callback) => {
    console.log("logging in");
    const output = await firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(success_callback, failed_callback);
  }

  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = user => {
    if (!user) {
      try {
        this.login(user);
      } catch ({ message }) {
        console.log("Failed:" + message);
      }
    } else {
      console.log("Reusing auth...");
    }
  };

  createAccount = async (user, navigation) => {
    console.log(user);
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(function() {
        console.log("created user successfully. User email:" + user.email + " name:" + user.name);
        var userf = firebase.auth().currentUser;
        userf.updateProfile({ displayName: user.name, photoURL: user.photo})
        .then(function() {
          console.log("Updated displayName successfully. name:" + user.name);
          navigation.navigate("LoginScreen");
        }, function(error) {
          console.warn("Error update displayName.");
        });
      }, function(error) {
        console.error("got error:" + typeof(error) + " string:" + error.message);
        alert("Create account failed. Error: "+error.message);
      });
  }

  onLogout = () => {
    firebase.auth().signOut().then(function() {
      console.log("Sign-out successful.");

    }).catch(function(error) {
      console.log("An error happened when signing out");
    });
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get name() {
    return (firebase.auth().currentUser || {}).displayName;
  }

  get email() {
    return (firebase.auth().currentUser || {}).email;
  }


  get avatar() {
    return (firebase.auth().currentUser || {}).photoURL;
  }

  get user() {
      return (firebase.auth().currentUser || {});
  }
}  

const firebaseSDK = new FirebaseSDK();
export default firebaseSDK;
