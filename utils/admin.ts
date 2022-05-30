import admin from "firebase-admin";

import credentials from "../credentials.json";

// export const firestore = firebase.firestore;

// import { initializeApp, applicationDefault } from "firebase-admin/app";

// initializeApp({
//   credential: applicationDefault(),

// });

if (!admin.apps.length) {
  admin.initializeApp({
    // @ts-ignore
    credential: admin.credential.cert(credentials),
  });
}

export const firestore = admin.firestore;
