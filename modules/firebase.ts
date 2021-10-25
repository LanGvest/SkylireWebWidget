import {initializeApp} from "firebase/app";

const firebaseApp = initializeApp(JSON.parse(process.env.NEXT_PUBLIC_FB_CONFIG||"{}"));

export default firebaseApp;