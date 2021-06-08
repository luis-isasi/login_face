import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCS1Q_QjYqS5BccTCllH8jdN8aD0Y-BmJ8',
  authDomain: 'devter-4f67d.firebaseapp.com',
  projectId: 'devter-4f67d',
  storageBucket: 'devter-4f67d.appspot.com',
  messagingSenderId: '367304741252',
  appId: '1:367304741252:web:9cfcc1bfc9261adedacdd1',
  measurementId: 'G-Y2HTHXXRQK',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export const uploadImage = (file) => {
  const ref = firebase.storage().ref(`images/${file.name}`);

  const task = ref.put(file);

  return task;
};
