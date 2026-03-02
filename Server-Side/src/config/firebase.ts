import admin from 'firebase-admin';
import { config } from './index.js';

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert({
    projectId: config.firebase.projectId,
    clientEmail: config.firebase.clientEmail,
    privateKey: config.firebase.privateKey,
  }),
});

export const firebaseAuth = firebaseApp.auth();
export default firebaseApp;
