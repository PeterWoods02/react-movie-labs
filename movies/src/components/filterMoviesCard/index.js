import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Rating from "@mui/material/Rating"; // Import the Rating component
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../spinner";
import img from "../../images/pexels-dziana-hasanbekava-5480827.jpg";

const formControl = {
  margin: 1,
  minWidth: 220,
  backgroundColor: "rgb(255, 255, 255)",
};

export default function FilterMoviesCard(props) {
  const [localRating, setLocalRating] = useState(props.ratingFilter / 10 || 0); // Initialize local rating

  const { data, error, isLoading, isError } = useQuery(
    "genres", // Query key
    getGenres, // Fetch function
    {
      staleTime: 1000 * 60 * 60 * 24, // Cache for 24 hours
      cacheTime: 1000 * 60 * 60 * 24, // Cache for 24 hours
      refetchOnWindowFocus: false, // Prevent refetching when window is focused
    }
  );

  // Handle loading state
  if (isLoading) {
    return <Spinner />;
  }

  // Handle error state
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  // Ensure genres is defined before accessing it
  const genres = data ? data.genres : [];

  // Ensure the "All" option is at the beginning of the list
  if (genres.length > 0 && genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  // Event handler for changes in the filter inputs
  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value); // Pass input changes to parent component
  };

  // Handle changes in the text field
  const handleTextChange = (e) => {
    handleChange(e, "name", e.target.value);
  };

  // Handle changes in the genre select dropdown
  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };

  // Handle changes in the rating
  const handleRatingChange = (e, newValue) => {
    setLocalRating(newValue); // Update local rating state
    const rating = (newValue / 5) * 10; // Convert to 0-10 scale
    props.onUserInput("rating", rating.toFixed(1)); // Pass the rating to the parent
  };

  return (
    <Card sx={{ backgroundColor: "rgb(204, 204, 0)" }} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the movies.
        </Typography>

        {/* Search by Title */}
        <TextField
          sx={{ ...formControl }}
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
          value={props.titleFilter}
          onChange={handleTextChange}
        />

        {/* Genre Select */}
        <FormControl sx={{ ...formControl }}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            value={props.genreFilter}
            onChange={handleGenreChange}
          >
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Star Rating Filter */}
        <Typography variant="subtitle1">
          Rating ({props.ratingFilter || "0"} - 10)
        </Typography>
        <Rating
          name="rating-filter"
          value={localRating} // Use localRating state here
          onChange={handleRatingChange}
          precision={0.5} // Allow half stars
        />
      </CardContent>

      {/* Card Image */}
      <CardMedia sx={{ height: 300 }} image={img} title="Filter" />

      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the movies.
        </Typography>
      </CardContent>
    </Card>
  );
}
