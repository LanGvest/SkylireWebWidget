import {initializeApp, FirebaseApp} from "firebase/app";

let configValue: string | null = process.env.FB_CONFIG || process.env.NEXT_PUBLIC_FB_CONFIG || null;
let firebaseApp: FirebaseApp | null = null;
console.log(process.env.FB_CONFIG);
console.log(process.env.NEXT_PUBLIC_FB_CONFIG);
console.log(configValue);
if(configValue) firebaseApp = initializeApp(JSON.parse(configValue));

export default firebaseApp;