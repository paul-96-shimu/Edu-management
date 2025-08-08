import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext/AuthContext';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from 'firebase/auth';
import { auth } from '../../firebase.config';

// import useRole from '../Hooks/useRole';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Observe auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ✅ get role using tanstack query
  // const { role, isRoleLoading } = useRole(user?.email);

  const authInfo = {
    createUser: (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    },
    signIn: (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    },
    updateUserProfile: (info) => updateProfile(auth.currentUser, info),
    logOut: () => {
      setLoading(true);
      return signOut(auth);
    },
    signInWithGoogle: () => {
      setLoading(true);
      return signInWithPopup(auth, googleProvider);
    },
    user,
    loading,
    // role,
    // isRoleLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
