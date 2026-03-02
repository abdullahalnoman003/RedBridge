import admin from 'firebase-admin';
import { config } from './index.js';

let firebaseApp: admin.app.App | null = null;

const getFirebaseApp = (): admin.app.App => {
  if (firebaseApp) {
    return firebaseApp;
  }

  const hasFirebaseConfig =
    !!config.firebase.projectId && !!config.firebase.clientEmail && !!config.firebase.privateKey;

  if (!hasFirebaseConfig) {
    throw new Error(
      'Firebase Admin SDK is not configured. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.'
    );
  }

  firebaseApp =
    admin.apps.length > 0
      ? admin.app()
      : admin.initializeApp({
          credential: admin.credential.cert({
            projectId: config.firebase.projectId,
            clientEmail: config.firebase.clientEmail,
            privateKey: config.firebase.privateKey,
          }),
        });

  return firebaseApp;
};

export const getFirebaseAuth = () => getFirebaseApp().auth();
export default getFirebaseApp;
