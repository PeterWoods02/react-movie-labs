import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { signUp, signIn, signOutUser } from "../firebase/firebaseAuth"; // Import Firebase Auth functions

const HomePageLogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();
  // Email validation
  const validateForm = () => {
    const isValidEmail = email.includes("@");
    const isValidPassword = password.length >= 6;

    if (!isValidEmail) {
      setErrorMessage("Invalid email address");
      return false;
    }
    if (!isValidPassword) {
      setErrorMessage("Password must be at least 6 characters long");
      return false;
    }

    setErrorMessage(""); // Clear error message if valid
    return true;
  };

  // Sign up handler
  const handleSignUp = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const userData = await signUp(email, password);
      setUser(userData);
      console.log("User signed up:", userData);
      navigate("/../../movies/home")
    } catch (error) {
      setErrorMessage(error.message || "Sign-up failed");
      console.error("Sign-up error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Sign in handler
  const handleSignIn = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const userData = await signIn(email, password);
      setUser(userData);
      console.log("User signed in:", userData);
      navigate("/../../movies/home")
    } catch (error) {
      setErrorMessage(error.message || "Sign-in failed");
      console.error("Sign-in error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Sign out handler
  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOutUser();
      setUser(null); // clear user
      navigate("/../../movies/HomePageLogIn")
    } catch (error) {
      setErrorMessage(error.message || "Sign-out failed");
      console.error("Sign-out error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "500px", margin: "0 auto" }}>
      <h1>TMDB Client Log In / Sign Up</h1>

      
      {errorMessage && (
        <div style={{ color: "red", marginBottom: "10px" }}>{errorMessage}</div>
      )}

      {/* User Authentication */}
      {user ? (
        <>
          <h2>Welcome, {user.email}</h2>
          <button onClick={handleSignOut} disabled={loading}>
            {loading ? "Signing Out..." : "Sign Out"}
          </button>
        </>
      ) : (
        <>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            style={inputStyle}
            disabled={loading}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={inputStyle}
            disabled={loading}
          />
          <button
            onClick={handleSignUp}
            style={buttonStyle}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          <button
            onClick={handleSignIn}
            style={buttonStyle}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </>
      )}
    </div>
  );
};

// css for styles will move later
const inputStyle = {
  padding: "8px",
  margin: "10px 0",
  width: "100%",
  boxSizing: "border-box",
  border: "1px solid #ccc",
  borderRadius: "4px",
};

const buttonStyle = {
  padding: "10px 20px",
  margin: "5px",
  cursor: "pointer",
  border: "1px solid #4CAF50",
  borderRadius: "4px",
  backgroundColor: "#4CAF50",
  color: "white",
};

export default HomePageLogIn;
