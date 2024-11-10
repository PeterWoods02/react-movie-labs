import React, { useState } from "react";
import { useQuery } from "react-query";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid2";
import { getMoviesForActor } from "../../api/tmdb-api";

function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");  // Movie name filter
  const [genreFilter, setGenreFilter] = useState("0");  // Genre filter
  const [actorId, setActorId] = useState(null);  // Actor ID for fetching actor's movies
  const [ratingFilter, setRatingFilter] = useState(0);  // Rating filter

  const genreId = Number(genreFilter);  // Convert genre filter to number

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "actor") setActorId(value);
    else if (type === "rating") setRatingFilter(value);
  };

  const { data: actorMovies, isLoading, isError, error } = useQuery(
    ["actorMovies", actorId], 
    () => getMoviesForActor(actorId),
    { enabled: !!actorId }
  );

  // Filter movies based on selected filters
  const filteredMovies = (actorMovies || movies).filter((movie) => {
    const matchesName = movie.title.toLowerCase().includes(nameFilter.toLowerCase());
    const matchesGenre = genreId > 0 ? movie.genre_ids.includes(genreId) : true;
    const matchesRating = ratingFilter > 0 ? movie.vote_average >= ratingFilter : true;

    return matchesName && matchesGenre && matchesRating;
  });

  if (isLoading) return <div>Loading actor's movies...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{ flex: "1 1 500px" }}>
        <Grid key="find" size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }} sx={{ padding: "20px" }}>
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            actorFilter={actorId}
            ratingFilter={ratingFilter}
          />
        </Grid>
        <MovieList action={action} movies={filteredMovies} />
      </Grid>
    </Grid>
  );
}

export default MovieListPageTemplate;
