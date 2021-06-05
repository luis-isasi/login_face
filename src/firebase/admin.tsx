const admin = require('firebase-admin');

//nos traemos las keys de nuestra aplicacion
const serviceAccount = require('./firebase-keys.json');

//inicializamos nuestra aplicion para pasandole nuetras keys

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} catch (e) {}

export const firestore = admin.firestore();
