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
    const userCurrentState = onAuthStateChanged(auth, (user) => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      // put this code above first to manually set a time out to show the skeleton loading state.  However, in bigger apps, with your return below, it will automatically show a loading state because you set it to show a skeleton loading state while it's loading all the info on bigger apps

      if (user) {
        setUser(user);
        setIsLoggedIn(true);
      } else {
        setUser({});
        setIsLoggedIn(false);
      }
      setLoading(true);
    });

    return () => userCurrentState();
  }, []);
  // code above let's the user stay logged in or out after refresh, so doesn't change the state
  // skeleton loading state code included above the if else so it runs that FIRST before each refresh, log in or log out


  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => { 
  //    setLoading(false);
  //     console.log(user);
  //     if (user) {
  //       setUser(user);
  //     }
  //   });
  // }, []);
  // this is the old David Brag useEffect but it did not keep user logged in after incorporating keeping the user logged in or out after refresh etc.


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
