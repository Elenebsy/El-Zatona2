import { useContext } from "react";
import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/Config";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });
    return unsub;
  }, []);

  const login = async (email, password) => {
    try {
    } catch (error) {}
  };
  const logout = () => {
    try {
    } catch (error) {}
  };

  const register = async (email, password, username, profileUrl) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log("response.user", res?.user);
      setUser(res?.user);
      setIsAuthenticated(true);
      await setDoc(doc(db, "users", res?.user?.uid), {
        username,
        profileUrl,
        userId: res?.user?.uid,
      });
      return { success: true, data: res?.user };
    } catch (error) {
      return { success: false, massage: error.massage };
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
