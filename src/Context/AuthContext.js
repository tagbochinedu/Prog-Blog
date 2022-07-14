import React, { useContext, useState, useEffect, useCallback } from "react";
import { auth } from "../Firebase";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { storage } from "../Firebase";
import {
  ref as ref_strg,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
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
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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

  //STORAGE CONTEXT
  const [imageList, setImageList] = useState([]);
  const [modalData, setModalData] = useState();

  const list = useCallback((folder) => {
    const imageListRef = ref_strg(storage, `${folder}`);
    setImageList([]);
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [
            ...prev,
            { url: url, name: item.name.split(".").shift() },
          ]);
        });
      });
    });
  }, []);
  function uploader(folder, image) {
    const imageRef = ref_strg(storage, `${folder}/${image.name}`);
    uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url]);
        console.log(imageList);
        alert("done");
      });
    });
  }
  function deleter(folder, name) {
    const imageRef = ref_strg(storage, `${folder}/${name}`);
    deleteObject(imageRef)
      .then(() => {})
      .catch((error) => {});
  }

  const value = {
    currentUser,
    signup,
    signin,
    signout,
    uploader,
    list,
    imageList,
    deleter,
    createpost,
    deletepost,
    updatepost,
    blogModal,
    setBlogModal,
    modalData,
    setModalData,
    isLogged, setIsLogged
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
