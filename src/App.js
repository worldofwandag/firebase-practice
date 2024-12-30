import React, { useState, useEffect } from "react";
import "./App.css";
import { auth } from "./firebase/init";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import Skeleton from "./components/Skeleton.jsx";

function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     setLoading(false);
  //     console.log(user);
  //     if (user) {
  //       setUser(user);
  //     }
  //   });
  // }, []);


  function register() {
    console.log("register");
    createUserWithEmailAndPassword(auth, "jemail2@email.com", "test123")
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function login() {
    signInWithEmailAndPassword(auth, "jemail2@email.com", "test123")
      .then(({ user }) => {
        console.log(user);
        setIsLoggedIn(true);
        setUser(user);
      })
      .catch((error) => {
        // setErrorMessage('The password is invalid or the user does not have a password.')
        console.log(error.message);
      });
  }

  function logOut() {
    signOut(auth);
    setUser({});
    setIsLoggedIn(false);
  }

  return (
    <div>
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <div className="App">
            <nav className="navbar">
              <div className="logo">
                <b>Frontend</b> Simplified
              </div>
              <div className="user__buttons">
                <div>
                  {!isLoggedIn ? (
                    <>
                      <button onClick={register}>Register</button>
                      <button onClick={login}>Login</button>
                    </>
                  ) : (
                    <button onClick={logOut} className="btn__logout--icon">
                      {user.email[0].toUpperCase()}
                    </button>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
