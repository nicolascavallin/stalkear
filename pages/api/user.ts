// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { COLLECTION } from "@/utils/constants";
import type { NextApiRequest, NextApiResponse } from "next";
import { auth, db } from "../../src/utils/admin";
import { authSchema, usernameSchema } from "@/utils/check";
export interface Request extends NextApiRequest {
  query: {
    [key: string]: string | string[];
    uid: string;
  };
}

export const authMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: Function,
) => {
  const { authorization } = req.headers;
  const token = authorization && authorization.split(" ")[1];

  if (!token) return res.status(400).json({ error: "Bad request" });

  try {
    const { uid } = await auth().verifyIdToken(token);

    req.query.uid = uid;

    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Bad token" });
  }
};

const getUserDoc = (uid: string) => db().collection(COLLECTION).doc(uid).get();

const createUserDoc = (uid: string, payload: object) =>
  db().collection(COLLECTION).doc(uid).create(payload);

const checkUsername = async (username: string) => {
  //
  const { error, value } = usernameSchema.validate(username, {
    convert: true,
  });

  if (error) return { check: "invalid" };

  const docs = await db()
    .collection(COLLECTION)
    .where("username", "==", value)
    .get();

  if (docs.docs.length === 0) {
    return { check: "valid", username: value };
  } else {
    return { check: "unavailable" };
  }
};

const setUsername = async (uid: string, username: string) =>
  db()
    .collection(COLLECTION)
    .doc(uid)
    .update({
      username,
      lastUsernameUpdated: new Date(),
      oldUsernames: db.FieldValue.arrayUnion(username),
    });

export default async function handler(req: Request, res: NextApiResponse) {
  await authMiddleware(req, res, async () => {
    // Create/Set username
    if (req.method === "POST") {
      //
      const doc = await getUserDoc(req.query.uid);

      if (doc.exists) {
        const { username } = req.body;
        const validUsername = await checkUsername(username);
        if (validUsername.check === "invalid")
          return res.status(400).json({ error: "Invalid username" });
        if (validUsername.check === "unavailable")
          return res.status(400).json({ error: "Unavailable username" });
        if (validUsername.check === "valid") {
          await setUsername(req.query.uid, validUsername.username);
          return res.status(200).json({ username: validUsername.username });
        }
      } else {
        return res.status(401).json({ error: "Unauthorized" });
      }
    }

    if (req.method === "GET") {
      //
      const doc = await getUserDoc(req.query.uid);

      if (doc.exists) {
        const payload = doc.data();
        const { value } = authSchema.validate(payload, {
          stripUnknown: true,
        });
        return res.status(200).json({
          ...value,
        });
      } else {
        const payload = {
          createdAt: new Date(),
          theme: "default",
        };
        await createUserDoc(req.query.uid, payload);
        const { value } = authSchema.validate(payload, {
          stripUnknown: true,
        });
        return res.status(201).json({
          ...value,
        });
      }
    }

    res.status(400);
  });
}
