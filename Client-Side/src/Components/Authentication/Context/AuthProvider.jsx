import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../Firebase/firebase.init";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (loggedInUser) => {
      if (loggedInUser) {
        try {
          const token = await loggedInUser.getIdToken(); 
          localStorage.setItem("access-token", token); 
          setUser(loggedInUser);
        } catch (error) {
          console.error("Token fetch error:", error);
        }
      } else {
        localStorage.removeItem("access-token");
        localStorage.removeItem("userRole");
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("access-token");
    signOut(auth);
  };
  const authInfo = {
    user,
    loading,
    logout,
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-base-100 via-base-200 to-base-300">
        <div className="text-center space-y-3">
          <span className="loading loading-bars loading-lg text-primary"></span>
          <p className="text-xl font-semibold text-primary ">Please Wait...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
