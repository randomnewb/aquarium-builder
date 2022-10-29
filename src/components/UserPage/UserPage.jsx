// Import useEffect to show user's aquariums on page load
import React, { useEffect } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import LabelIcon from "@mui/icons-material/Label";
import CommentIcon from "@mui/icons-material/Comment";
// import "./PlainButton.css";
// import drop from "./drop.css";

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
                <Container maxWidth={true}>
                    <Typography
                        variant="h4"
                        textAlign="center"
                        sx={{ fontFamily: "Rubik" }}>
                        Welcome, {user.username}!
                    </Typography>
                    <br />
                    {aquariums.length === 0 && (
                        <Typography
                            variant="h3"
                            textAlign="center"
                            sx={{ fontFamily: "Rubik" }}>
                            There are currently no aquariums.
                        </Typography>
                    )}
                    {aquariums.length > 0 && (
                        <Typography
                            variant="h3"
                            textAlign="center"
                            sx={{ fontFamily: "Rubik" }}>
                            Current Aquariums
                        </Typography>
                    )}
                    {aquariums.length === 0 && (
                        <Typography textAlign="center">
                            <br />
                            <br />
                            <br />
                            <Button
                                onClick={() => history.push("/setup")}
                                sx={{
                                    textTransform: "none",
                                    backgroundColor: "#EAB06E",
                                    color: "black",

                                    ":hover": {
                                        bgcolor: "#F2DDA6",
                                        color: "black",
                                    },
                                }}>
                                Create a New Aquarium
                            </Button>
                        </Typography>
                    )}
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
                            md={3}
                            marginTop={2}
                            paddingRight={2}>
                            <Card
                                key={aquarium.id}
                                sx={{
                                    backgroundColor: "#0F506E",
                                    color: "white",
                                }}>
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        noWrap>
                                        <LabelIcon
                                            sx={{
                                                verticalAlign: -2,
                                                fontSize: 20,
                                            }}
                                        />{" "}
                                        {aquarium.name}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        noWrap>
                                        <SquareFootIcon
                                            sx={{
                                                verticalAlign: -2,
                                                fontSize: 22,
                                            }}
                                        />{" "}
                                        {aquarium.length}"x
                                        {aquarium.width}"x{aquarium.height}" (
                                        {(
                                            (aquarium.length *
                                                aquarium.width *
                                                aquarium.height) /
                                            231
                                        ).toFixed(2)}{" "}
                                        gallons)
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        noWrap>
                                        <CommentIcon
                                            sx={{
                                                verticalAlign: -2,
                                                fontSize: 20,
                                            }}
                                        />{" "}
                                        {aquarium.note}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        textAlign="center">
                                        <img
                                            src={aquarium.image_url}
                                            width={200}
                                            maxheight="true"
                                            className="drop"></img>
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: "center" }}>
                                    <Button
                                        onClick={(e) =>
                                            viewAquariumDetail(aquarium)
                                        }
                                        // className="button"
                                        sx={{
                                            textTransform: "none",
                                            backgroundColor: "#EAB06E",
                                            color: "black",

                                            ":hover": {
                                                bgcolor: "#F2DDA6",
                                                color: "black",
                                            },
                                        }}>
                                        View Details
                                    </Button>
                                </CardActions>
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
