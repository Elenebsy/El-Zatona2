import { auth ,authentication} from "./Config";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  signInWithCredential,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup
  
} from "@firebase/auth";
import { db } from "./Config";
import { collection } from "@firebase/firestore";
import {setDoc, doc, getDoc} from "@firebase/firestore";
const provider = new GoogleAuthProvider();


// Listen for authentication state to change.
onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("We are authenticated now!");
  }

  // Do other things
});

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
async function signInWithGoogle() {
  signInWithPopup(authentication, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}

export { register, login , forgetPassword, signInWithGoogle};
