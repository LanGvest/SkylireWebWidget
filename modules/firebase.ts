import {initializeApp, FirebaseApp} from "firebase/app";

let configValue: string | null = process.env.FB_CONFIG || process.env.NEXT_PUBLIC_FB_CONFIG || null;
let firebaseApp: FirebaseApp | null = null;
if(configValue) firebaseApp = initializeApp(JSON.parse(configValue.replace(/'/g, "\"")));

export default firebaseApp;