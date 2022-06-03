import { auth } from "@/utils/client";
import { UserData } from "@/utils/interfaces";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  User,
} from "firebase/auth";
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import api from "./api";

import { Context } from "./types";

const AuthContext = createContext({} as Context);
const provider = new GoogleAuthProvider();

const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  //
  const [user, setUser] = useState<User | null>(null);
  const [data, setData] = useState<UserData | null>(null);

  const login = () => signInWithPopup(auth, provider);
  const logout = () => auth.signOut();

  // useEffect(() => {
  //   let unsub: null | (() => void);

  //   onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       const getUserData = async () => {
  //         const docRef = doc(db, "user", user.uid);
  //         const userDoc = await getDoc(docRef);

  //         if (userDoc.exists()) {
  //         } else {
  //           const newDoc = await setDoc(docRef, {
  //             createdAt: serverTimestamp(),
  //             theme: "default",
  //           });
  //         }

  //         onSnapshot(doc(db, "user", user.uid), (doc) => {
  //           console.log("Current data: ", doc.data());
  //           // @ts-ignore
  //           setUser({ user, ...doc.data() });
  //         });
  //       };

  //       getUserData();
  //     } else {
  //       setUser(null);
  //     }
  //   });

  //   return () => {
  //     unsub?.();
  //   };
  // }, []);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();

        api.getUser(token).then((res) => {
          setUser(user);
          setData(res);
          console.log(res);
        });
        // fetch("api/user", {
        //   method: "get",
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // })
        //   .then((res) => res.json())
        //   .then((res) => {
        //     setData(res.payload);
        //     setUser(user);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //     setUser(null);
        //   });
      } else {
        setUser(null);
      }
    });
  }, []);

  const setUsername = async (username: string) =>
    api
      .setUsername(await user?.getIdToken(), username)
      .then((x) => setData((old) => ({ ...data, ...x })));

  const state = {
    user,
    data,
  };
  const actions = {
    login,
    logout,
    setUsername,
  };

  return (
    <AuthContext.Provider value={{ state, actions }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext as default, AuthProvider };
