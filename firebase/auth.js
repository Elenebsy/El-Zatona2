import { auth } from "./Config";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  signInWithCredential,
  FacebookAuthProvider
  
} from "@firebase/auth";
import { db } from "./Config";
import { collection } from "@firebase/firestore";
import {setDoc, doc, getDoc, updateDoc} from "@firebase/firestore"
// Listen for authentication state to change.
onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("We are authenticated now!");
  }

  // Do other things
});
async function updateuser(user){
  const currentUserid = auth.currentUser.uid;
  
}
async function register(email, password, name, phone, code) {
  
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const usercol = collection(db, "users");
  const docRef = doc(usercol, cred.user.uid);
await setDoc(docRef, {
  email: email,
  name: name,
  phone: phone,
  code: code,
  password: password

})

  
  return cred;
}

async function login(email, password) {
  await signInWithEmailAndPassword(auth, email, password);
}
async function forgetPassword(email) {
  await sendPasswordResetEmail(auth, email);
}

export { register, login , forgetPassword};
