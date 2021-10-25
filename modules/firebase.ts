import {initializeApp, FirebaseApp} from "firebase/app";

let firebaseApp: FirebaseApp | null = null;
if(process.env.NEXT_PUBLIC_FB_CONFIG) firebaseApp = initializeApp(JSON.parse(process.env.NEXT_PUBLIC_FB_CONFIG));

export default firebaseApp;