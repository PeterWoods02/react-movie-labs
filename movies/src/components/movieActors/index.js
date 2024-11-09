import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom"; // Import useParams
import { getMovieActors } from "../../api/tmdb-api"; 
import Spinner from '../spinner';
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import ActorCard from "../actorCard";


const MovieActors = () => {
    const { id } = useParams(); //useParams to get the movie ID from the URL
    const { data: movieActors, isLoading, isError, error } = useQuery(
        ['movieActors', id], // make id into query too
        () => getMovieActors(id), 
        {
          staleTime: 1000 * 60 * 60 * 24, // Cache data for 24 hours
          cacheTime: 1000 * 60 * 60 * 24, // Cache data for 24 hours
          refetchOnWindowFocus: false, // Do not refetch on window focus
        } 
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    const movies = movieActors.results; 

    return (
        <>
            <Typography variant="h5" component="h3" sx={{ marginTop: "16px" }}>
                Cast Members
            </Typography>
            <Paper component="ul" sx={{
                display: "flex",
                flexWrap: "wrap",
                listStyle: "none",
                padding: 1.5,
                margin: 0,
            }}>
        
                {movieActors?.cast.slice(0, 10).map((actor) => ( // Map over the 'cast' array in 'movieActors', displaying only the first 10 actors.
                    <li key={actor.id}>
                        <ActorCard actor={actor} />
                    </li>
                ))}
            </Paper>
        </>
    );
};

export default MovieActors;
