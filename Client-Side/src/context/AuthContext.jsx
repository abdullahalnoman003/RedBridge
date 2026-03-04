import { createContext, useState, useEffect, useCallback } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { createUser } from '../services/user.service';
import axiosInstance from '../services/axiosInstance';

export const AuthContext = createContext(null);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let app = null;
let auth = null;

try {
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  auth = getAuth(app);
} catch {
  app = null;
  auth = null;
}

export function AuthProvider({ children }) {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDbUser = useCallback(async () => {
    try {
      const res = await axiosInstance.get('/api/users');
      const currentEmail = auth?.currentUser?.email;
      if (res.data?.data) {
        const users = res.data.data;
        const match = users.find((u) => u.email === currentEmail);
        if (match) {
          setDbUser(match);
          return;
        }
      }
    } catch {
      // silently ignore
    }
  }, []);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      if (user) {
        await fetchDbUser();
      } else {
        setDbUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [fetchDbUser]);

  const register = async (name, email, password) => {
    if (!auth) throw new Error('Firebase is not configured');
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    const res = await createUser({ name, email });
    setDbUser(res.data?.data);
    return userCredential.user;
  };

  const login = async (email, password) => {
    if (!auth) throw new Error('Firebase is not configured');
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await fetchDbUser();
    return userCredential.user;
  };

  const logout = async () => {
    if (!auth) return;
    await signOut(auth);
    setDbUser(null);
    setFirebaseUser(null);
  };

  const value = {
    firebaseUser,
    dbUser,
    loading,
    register,
    login,
    logout,
    fetchDbUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
