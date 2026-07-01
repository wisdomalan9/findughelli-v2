import app from "./config";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
