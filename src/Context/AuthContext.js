import React, { useContext, useState, useEffect } from "react";
import { auth } from "../Firebase";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { db } from "../Firebase";
import { ref as ref_db, set, remove, update } from "firebase/database";
import { uid } from "uid";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  //AUTHENTICATION CONTEXT
  const [currentUser, setCurrentUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      localStorage.setItem("currentUser", JSON.stringify(user.email));
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);
  
  function signup(email, password) {
    createUserWithEmailAndPassword(auth, email, password);
  }
  function signin(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signout() {
    localStorage.clear();
    return signOut(auth);
  }

  //REALTIME DATABASE CONTEXT
  const [blogModal, setBlogModal] = useState(false);
  function createpost(location, title, post) {
    const uuid = uid();
    set(ref_db(db, `${location}/${uuid}`), {
      title,
      post,
      uuid,
    });
  }
  function deletepost(location, uuid) {
    remove(ref_db(db, `${location}/${uuid}`));
  }
  function updatepost(location, uuid, title, post) {
    update(ref_db(db, `${location}/${uuid}`), {
      title,
      post,
      uuid,
    });
  }

  

  const value = {
    currentUser,
    signup,
    signin,
    signout,
    createpost,
    deletepost,
    updatepost,
    blogModal,
    setBlogModal,
    isLogged,
    setIsLogged,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
