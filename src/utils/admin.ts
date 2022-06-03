import admin from "firebase-admin";

import credentials from "../../credentials.json";

if (!admin.apps.length) {
  admin.initializeApp({
    // @ts-ignore
    credential: admin.credential.cert(credentials),
  });
}

export const db = admin.firestore;
export const auth = admin.auth;
