import { useContext } from "react";
import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/Config";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { Alert } from "react-native";
import { db } from "../firebase/Config";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      // console.log("user", user);
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
        updateUserData(user.uid);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unsub;
  }, []);

  const updateUserData = async (userId) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let userData = docSnap.data();
      setUser({
        ...user,
        username: userData.username,
        profileUrl: userData.profileUrl,
      });
    }
  };
  const login = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      // setUser(res?.user);
      // setIsAuthenticated(true);
      return { success: true, data: res?.user };
    } catch (error) {
      let message = error.message;
      if (error.code === "auth/user-not-found") {
        message = "User not found";
        Alert.alert("Error", message);
      } else if (error.code === "auth/wrong-password") {
        message = "Wrong password";
        Alert.alert("Error", message);
      } else if (error.code === "auth/invalid-email") {
        message = "Invalid email";
        Alert.alert("Error", message);
      } else if (error.code === "auth/too-many-requests") {
        message = "Too many requests";
        Alert.alert("Error", message);
      }
    }
  };
  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message, error: error };
    }
  };

  const register = async (email, password, username, profileUrl) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log("response.user", res?.user);
      setUser(res?.user);
      setIsAuthenticated(true);
      await setDoc(doc(db, "users", res?.user?.uid), {
        username,
        password,
        userId: res?.user?.uid,
      });
      return { success: true, data: res?.user };
    } catch (error) {
      let message = error.message;
      if (error.code === "auth/email-already-in-use") {
        message = "Email already in use";
        Alert.alert("Error", message);
      } else if (error.code === "auth/invalid-email") {
        message = "Invalid email";
        Alert.alert("Error", message);
      } else if (error.code === "auth/weak-password") {
        message = "Weak password";
        Alert.alert("Error", message);
      }

      return { success: false, message };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return value;
};
