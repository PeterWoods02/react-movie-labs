import React, { useState } from "react";
import { signUp, signIn, signOutUser } from "../firebase/firebaseAuth"; // Import Firebase Auth functions

const HomePageLogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  // Sign up handler
  const handleSignUp = async () => {
    try {
      const userData = await signUp(email, password);
      setUser(userData);
      console.log("User signed up:", userData);
    } catch (error) {
      console.error("Sign-up error:", error);
    }
  };

  // Sign in handler
  const handleSignIn = async () => {
    try {
      const userData = await signIn(email, password);
      setUser(userData);
      console.log("User signed in:", userData);
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  // Sign out handler
  const handleSignOut = async () => {
    try {
      await signOutUser();
      setUser(null); // Clear user state
      console.log("User signed out");
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  return (
    <div>
      <h1>Firebase Authentication Example</h1>

      {/* User Authentication */}
      {user ? (
        <>
          <h2>Welcome, {user.email}</h2>
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      ) : (
        <>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button onClick={handleSignUp}>Sign Up</button>
          <button onClick={handleSignIn}>Sign In</button>
        </>
      )}
    </div>
  );
};

export default HomePageLogIn;
