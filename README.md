# Assignment 1 - ReactJS app.

Name: Peter Woods

## Overview.

This repository contains a React-based movie web applicaion, using the TMDB API to display movie data. Users can explore the database, leave reviews. add to favroites/playlists, search/sort the movies and more. ALso contains a profile management systems which allows users to log in/sign up. React query is used for quick data fetching for a smooth running application.

### Features.
 
+ New static pages "Top Rated" & "Trending"
+ Button to display recommended movies based on current move/:id accessed
+ Added cast members within movie details
+ Clicking on an actor brings you to movies they feature in
+ Caching on endpoints
+ Rating filter 
+ Searching by actor
+ Sorting options
+ Playlist functionailty
+ Firebase Authentication
+ Firestore for movies added to playlist
+ New Styling
+ Page to search entire database of movies
+ Pagination
+ Snackbar confirmations


## Setup requirements.

<ol>
    <li>Clone the repo:
      <pre><code>git clone https://github.com/PeterWoods02/react-movie-labs.git</code></pre>
    </li>
    <li>Install dependencies:
      <pre><code>npm install</code></pre>
    </li>
  </ol>

  <h2>Usage</h2>
  <ol>
    <li>Start the project:
      <pre><code>npm start</code></pre>
    </li>
  </ol>

## API endpoints.

+ Discover trending movies - /movie/trending
+ Discover the top rated movies - /movies/top_rated
+ Search for movies - /search/movie
+ Filter by actor - /search/person
+ Get movie recommendations - /movie/{movie_id}/similar
+ Get the cast - /movie/{movie_id}/credits
+ Movies a searched actor is in - /person/{actor_id}/movie_credits
+ Return actor profile - /search/person

  
## Routing.
### Public - No Sign In
+ /movies/homePageLogIn - Log In page
+ /movies/topRated - Displays top rated movies
+ /movies/trending - Displays trending movies
+ /movies/all - Page to search all databse
+ /movies/:id/recommendations - Display similar movies based on current movie/:id
+ /movies/:id/actors - Displays actors for current movie movie
+ /actor/:actorId/movies - Displays movies for actor selected
### Private - Sign In Required
+ /movies/profilePage - Page to show playlist based on user


## Independent learning.

https://mui.com/material-ui/react-pagination/ - used to add pagination to /src/components/movieListPageSearch
https://firebase.google.com/ - used for firebase authentication and firestore /src/firebase
https://mui.com/material-ui/customization/theming/ - To custom make my /src/themes/theme.js 
https://mui.com/material-ui/react-snackbar/ - Confirmation with snackbar /src/components/cardIcons
