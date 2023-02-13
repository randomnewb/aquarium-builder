import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import { Typography, TextField, Paper } from "@mui/material";
import { Container } from "@mui/system";

const Profile = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector((store) => store.user);

    const editProfile = () => {
        history.push(`/profile/edit/${user.id}`);
    };

    return (
        <Container>
            <Typography variant="h4">Profile</Typography>
            <br />
            <Paper
                elevation={12}
                sx={{ p: 3, backgroundColor: "#0F506E", color: "white" }}>
                <Typography variant="h6">
                    <img
                        src={user.avatar}
                        width={250}
                        maxheight="true"
                        className="drop"></img>
                </Typography>
                <Typography variant="h4">Name: {user.username}</Typography>
                <Typography variant="h4">
                    Favorite Plant: {user.favorite_plant}
                </Typography>
                <Typography variant="h4">
                    Favorite Animal: {user.favorite_animal}
                </Typography>
                <Typography variant="h4">
                    Aquascaping Style: {user.aquascaping_style}
                </Typography>
                <Typography variant="h4">
                    Years in the Hobby:{user.years_hobby}
                </Typography>
                <Typography variant="h4">
                    About Me:{user.description}
                </Typography>
                <br />
            </Paper>
            <Button
                onClick={(e) => editProfile(e)}
                variant="action">
                Edit Profile
            </Button>
        </Container>
    );
};

export default Profile;
