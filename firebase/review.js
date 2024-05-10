import { auth, db } from "./Config";
import {
  doc,
  getDoc,
  collection,
  setDoc,
  serverTimestamp,
  getDocs,
} from "@firebase/firestore";

async function postComment(commentText) {
  const user = auth.currentUser;

  if (!user) {
    console.error("No authenticated user available.");
    return;
  }

  try {
    const userData = await getUserById(); // Await the async function
    if (!userData) {
      console.error("User data not found, cannot post comment.");
      return;
    }

    const commentsRef = collection(db, "comments");
    const commentDocRef = doc(commentsRef); // Firestore generates a unique ID

    await setDoc(commentDocRef, {
      userId: user.uid,
      username: userData.name, // Use name from userData
      comment: commentText,
      timestamp: serverTimestamp(), // Using Firestore serverTimestamp
    });

    console.log("Comment posted successfully with ID:", commentDocRef.id);
  } catch (error) {
    console.error("Error posting comment:", error);
    throw error; // Consider the implications of throwing errors in async functions
  }
}

async function getReviews() {
  const reviewsRef = collection(db, "comments");
  try {
    console.log("Fetching documents from Firestore...");
    const querySnapshot = await getDocs(reviewsRef);
    console.log(`Found ${querySnapshot.docs.length} documents`);

    const reviews = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Reviews:", reviews);
    return reviews.length > 0 ? reviews : [];
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}

async function getUserById() {
  const user = auth.currentUser;
  if (!user) {
    console.error("No user logged in.");
    return null;
  }

  const docRef = doc(db, "users", user.uid);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log("User data:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

export { postComment, getReviews, getUserById }; // Export getUserById if needed elsewhere
