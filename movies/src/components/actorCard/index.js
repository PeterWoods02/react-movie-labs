import React from "react";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";

const ActorCard = ({ actor }) => {
    return (
        <Chip
            avatar={
                actor.profile_path ? (
                    <Avatar 
                        src={`https://image.tmdb.org/t/p/w92${actor.profile_path}`} 
                        sx={{ width: 56, height: 56 }} // Larger avatar
                    />
                ) : (
                    <Avatar sx={{ width: 56, height: 56 }}>{actor.name[0]}</Avatar>
                )
            }
            label={
                <span>
                    {actor.name} as<strong><em> {actor.character}</em></strong>
                </span>
            }
            sx={{ margin: "0.5rem", padding: "0.5rem 1rem", fontSize: "1.1rem" }} // Larger font and padding
        />
    );
};

export default ActorCard;
