import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCDNBjpT5yEBrFy5luTq_27VkwoN96Ys1w",
  authDomain: "kwikmedical23.firebaseapp.com",
  projectId: "kwikmedical23",
  storageBucket: "kwikmedical23.appspot.com",
  messagingSenderId: "665416290318",
  appId: "1:665416290318:web:f50178387d9c4d603c6c5f",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
