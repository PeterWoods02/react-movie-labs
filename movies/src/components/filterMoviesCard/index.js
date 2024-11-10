import React, { useState } from "react";
import { useQuery } from "react-query";
import {
  Card, CardContent, Typography, InputLabel, MenuItem, TextField,
  FormControl, Select, Rating, Button
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getGenres, getActorByName, fetchActorId } from "../../api/tmdb-api";
import Spinner from "../spinner";

const formControl = { margin: 1, minWidth: 220, backgroundColor: "rgb(255, 255, 255)" };

export default function FilterMoviesCard({ titleFilter, genreFilter, ratingFilter, onUserInput }) {
  // State to handle the rating filter
  const [localRating, setLocalRating] = useState(ratingFilter / 10 || 0);
  
  // State to handle the search term for actor search
  const [searchTerm, setSearchTerm] = useState("");
  
  // State to filter the actor's data based on user input
  const [actorFilter, setActorFilter] = useState("");
  
  // State to handle actor search status (idle, searching)
  const [actorSearchStatus, setActorSearchStatus] = useState("idle");

  // Fetch genres for dropdown from the API
  const { data: genreData, isLoading: genreLoading, isError: genreIsError } = useQuery(
    "genres", getGenres, { staleTime: 1000 * 60 * 60 * 24, cacheTime: 1000 * 60 * 60 * 24, refetchOnWindowFocus: false }
  );

  // Fetch actor data based on search term from the API
  const { data: actorData, isLoading: actorLoading, isError: actorIsError } = useQuery(
    ["actorByName", actorFilter], () => getActorByName(actorFilter), {
      staleTime: 1000 * 60 * 60 * 24,
      cacheTime: 1000 * 60 * 60 * 24,
      refetchOnWindowFocus: false,
      enabled: actorSearchStatus === "searching" && actorFilter.length > 0, // Only trigger if searching
    }
  );

  // Show a loading spinner if genres or actors are still loading
  if (genreLoading || actorLoading) return <Spinner />;
  
  // Show an error message if fetching genres or actor data fails
  if (genreIsError || actorIsError) return <h1>Error loading data</h1>;

  // Extract genres and ensure "All" is the first option in the dropdown
  const genres = genreData?.genres || [];
  if (genres.length && genres[0].name !== "All") genres.unshift({ id: "0", name: "All" });

  // Extract actor list from the search results
  const actorsList = actorData?.results || [];

  // Handle the click event for actor search
  const handleSearchClick = async () => {
    if (!searchTerm.trim()) return;  // If search term is empty, return early

    setActorSearchStatus("searching");
    setActorFilter(searchTerm); // Set the actor search term

    try {
      // Fetch actor details by name
      const actorData = await fetchActorId(searchTerm);
      if (actorData?.results?.length) {
        const selectedActor = actorData.results[0];
        onUserInput("actor", selectedActor.id); // Update parent component with selected actor's ID
      } else {
        onUserInput("actor", null); // If no actor found, pass null
      }
    } catch {
      onUserInput("actor", null); // In case of error, pass null
    }
  };

  return (
    <Card sx={{ backgroundColor: "rgb(204, 204, 0)" }} variant="outlined">
      <CardContent>
        {/* Header with search icon */}
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" /> Filter the movies.
        </Typography>

        {/* TextField for searching by movie title */}
        <TextField
          sx={formControl}
          label="Search field"
          type="search"
          variant="filled"
          value={titleFilter}
          onChange={(e) => onUserInput("name", e.target.value)} // Update parent on title filter change
        />

        {/* Dropdown menu for selecting genre */}
        <FormControl sx={formControl}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            value={genreFilter}
            onChange={(e) => onUserInput("genre", e.target.value)} // Update parent on genre filter change
          >
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Display rating filter */}
        <Typography variant="subtitle1">Rating ({ratingFilter || "0"} - 10)</Typography>
        <Rating
          name="rating-filter"
          value={localRating}
          onChange={(e, newValue) => {
            setLocalRating(newValue); // Update local rating
            onUserInput("rating", ((newValue / 5) * 10).toFixed(1)); // Update parent with rating value
          }}
          precision={0.5}
        />

        {/* TextField for searching by actor */}
        <TextField
          sx={formControl}
          label="Search by Actor"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term as user types
          variant="filled"
        />

        {/* Show actor suggestions if search term matches */}
        {searchTerm && actorsList.length > 0 && (
          <div style={{ maxHeight: "200px", overflowY: "auto" }}>
            {actorsList.map((actor) => (
              <MenuItem
                key={actor.id}
                value={actor.id}
                onClick={() => {
                  setActorFilter(actor.id); // Set actor filter
                  setSearchTerm(actor.name); // Set search term to actor's name
                  onUserInput("actor", actor.id); // Update parent with selected actor's ID
                }}
              >
                {actor.name}
              </MenuItem>
            ))}
          </div>
        )}

        {/* Search button to trigger actor search */}
        <Button
          sx={{ paddingTop: "16px" }}
          variant="contained"
          color="primary"
          onClick={handleSearchClick} // Trigger actor search on click
        >
          Search
        </Button>
      </CardContent>
    </Card>
  );
}
