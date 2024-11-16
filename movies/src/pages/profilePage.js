import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Container, Grid } from "@mui/material";
import { getPlaylistMovies } from "../firebase/firestore"; // Import the function
import RemoveFromPlaylist from "../components/cardIcons/removeFromPlaylist"; // Import the RemoveFromPlaylist component
import PageTemplate from "../components/templateMovieListPageNoFilter"; // Import your PageTemplate

const ProfilePage = () => {
  const [user, setUser] = useState(null); // State to store the logged-in user info
  const [movies, setMovies] = useState([]); // State to store the playlist movies
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set user if logged in
        getPlaylistMovies(currentUser.uid) // Fetch the playlist movies for the logged-in user
          .then((movieDetails) => {
            setMovies(movieDetails); // Set the movies in state
          })
          .catch((error) => {
            console.error("Error fetching movies: ", error);
          });
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

          <Typography variant="h6" gutterBottom>My Playlist Movies</Typography>
          
          {/* Use PageTemplate to display movies */}
          <PageTemplate
            title="My Playlist"
            movies={movies} // Pass the movies array to the PageTemplate
            action={(movie) => (
              <RemoveFromPlaylist movieId={movie.id} /> // Render RemoveFromPlaylist button for each movie
            )}
          />

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
