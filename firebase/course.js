import { db } from "./Config";
import { collection } from "@firebase/firestore";
import {
  setDoc,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  onSnapshot,
} from "@firebase/firestore";

async function getCoursebyId(id) {
  const courseCol = collection(db, "courses");
  const docRef = doc(courseCol, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;
}

async function getCourses() {
  const courseCol = collection(db, "courses");
  const querySnapshot = await getDocs(courseCol);
  const courses = [];
  querySnapshot.forEach((doc) => {
    courses.push(doc.data());
  });
  return courses;
}

async function addCourse(course) {
  const courseCol = collection(db, "courses");
  const docRef = await setDoc(doc(courseCol), course);
  return docRef;
}

async function deleteCourse(id) {
  const courseCol = collection(db, "courses");
  const docRef = doc(courseCol, id);
  await deleteDoc(docRef);
}

async function updateCourse(id, course) {
  const courseCol = collection(db, "courses");
  const docRef = doc(courseCol, id);
  await updateDoc(docRef, course);
}

const uploadToFirebase = async (uri, name) => {
  const fetchResult = await fetch(uri);
  const theBlob = await fetchResult.blob();
  console.log("theBlob", theBlob);
};

export {
  getCoursebyId,
  getCourses,
  addCourse,
  deleteCourse,
  updateCourse,
  uploadToFirebase,
};
