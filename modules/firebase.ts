import {initializeApp, FirebaseApp} from "firebase/app";

let configValue: string | null = process.env.FB_CONFIG || process.env.NEXT_PUBLIC_FB_CONFIG || null;
let firebaseApp: FirebaseApp | null = null;
console.log("###INFO###", process.env.FB_CONFIG, typeof process.env.FB_CONFIG);
console.log("###INFO###", process.env.NEXT_PUBLIC_FB_CONFIG, typeof process.env.NEXT_PUBLIC_FB_CONFIG);
console.log("###INFO###", configValue, typeof configValue);
if(configValue) firebaseApp = initializeApp(JSON.parse(configValue.replace(/'/g, "\"")));

export default firebaseApp;