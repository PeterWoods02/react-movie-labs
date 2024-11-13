import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Container } from "@mui/material";

const ProfilePage = () => {
  const [user, setUser] = useState(null); // State to store the logged-in user info
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set user if logged in
      } else {
        setUser(null); // Set to null if logged out
        navigate("/movies/homePageLogIn"); // Redirect to login if not logged in
      }
    });
    return () => unsubscribe(); // Cleanup listener when component is unmounted
  }, [navigate]);

  return (
    <Container>
      {user ? (
        <>
          <Typography variant="h4" gutterBottom>
            Profile Page
          </Typography>
          <Typography variant="h6">Welcome, {user.displayName || "User"}!</Typography>
          <Typography variant="body1">Email: {user.email}</Typography>
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt="profile"
              style={{ width: 100, height: 100, borderRadius: "50%", marginTop: 20 }}
            />
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              const auth = getAuth();
              auth.signOut(); // Log out
              navigate("/movies/homePageLogIn"); // Redirect to login
            }}
            sx={{ marginTop: 2 }}
          >
            Log Out
          </Button>
        </>
      ) : (
        <Typography variant="body1">Loading...</Typography>
      )}
    </Container>
  );
};

export default ProfilePage;
