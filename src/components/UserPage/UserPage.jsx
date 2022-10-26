// Import useEffect to show user's aquariums on page load
import React, { useEffect } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";

// Import useHistory so we can change view on click
import { useHistory } from "react-router-dom";

// Import useDispatch so that we can click on specific aquariums to view their detail
import { useSelector, useDispatch } from "react-redux";

function UserPage() {
    const history = useHistory();
    // Use dispatch so that we can FETCH aquariums
    const dispatch = useDispatch();

    // Pull all the user's aquariums from the store
    const aquariums = useSelector((store) => store.aquariums.allAquariums);

    // FETCH our aquariums on load
    useEffect(() => {
        dispatch({ type: "FETCH_AQUARIUMS" });
    }, []);

    const viewAquariumDetail = (aquariumToDisplay) => {
        history.push(`/aquarium/${aquariumToDisplay.id}`);
    };

    // this component doesn't do much to start, just renders some user reducer info to the DOM
    const user = useSelector((store) => store.user);
    return (
        <div>
            <Grid
                className="container"
                container
                spacing={2}>
                <Container>
                    <Typography variant="h1">
                        Welcome, {user.username}!
                    </Typography>
                    <Typography variant="h2">
                        {" "}
                        Your Current Aquariums{" "}
                    </Typography>
                    <Button onClick={() => history.push("/setup")}>
                        Create a New Aquarium
                    </Button>
                </Container>
                {/* <p>Your ID is: {user.id}</p> */}
                {/* <LogOutButton className="btn" /> */}
                {/* Aquariums will be displayed here along with create aquarium button */}

                {/* {JSON.stringify(aquariums)}; */}
                {aquariums.map((aquarium) => {
                    return (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={3}>
                            <Card key={aquarium.id}>
                                <Typography variant="h4">
                                    {aquarium.name} Length: {aquarium.length}"
                                    Width: {aquarium.width}" Height:{" "}
                                    {aquarium.height}" Note: {aquarium.note}
                                </Typography>
                                <img src={aquarium.image_url}></img>
                                <Button
                                    onClick={(e) =>
                                        viewAquariumDetail(aquarium)
                                    }>
                                    View Aquarium Detail
                                </Button>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
}

// this allows us to use <App /> in index.js
export default UserPage;
