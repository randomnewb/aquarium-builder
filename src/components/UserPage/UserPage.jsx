// Import useEffect to show user's aquariums on page load
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    Button,
    Grid,
    Card,
    CardActions,
    CardContent,
    Typography,
} from "@mui/material/";

import { Container } from "@mui/system";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import LabelIcon from "@mui/icons-material/Label";
import CommentIcon from "@mui/icons-material/Comment";

function UserPage() {
    const history = useHistory();
    // Use dispatch so that we can FETCH aquariums
    const dispatch = useDispatch();

    // Pull all the user's aquariums from the store
    const aquariums = useSelector((store) => store.aquariums.allAquariums);
    const user = useSelector((store) => store.user);

    // FETCH our aquariums on load
    useEffect(() => {
        dispatch({ type: "FETCH_AQUARIUMS" });
    }, []);

    const viewAquariumDetail = (aquariumToDisplay) => {
        history.push(`/aquarium/${aquariumToDisplay.id}`);
    };

    return (
        <div>
            <Grid
                className="container"
                container
                spacing={2}>
                <Container maxWidth="true">
                    <Typography
                        variant="header"
                        // textAlign="center"
                        // sx={{ fontFamily: "Rubik" }}
                    >
                        Welcome, {user.username}!
                    </Typography>
                    <br />
                    {aquariums.length === 0 && (
                        <Typography
                            variant="header"
                            // textAlign="center"
                            // sx={{ fontFamily: "Rubik" }}
                        >
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

                {aquariums.map((aquarium) => {
                    return (
                        <Grid
                            key={aquarium.id}
                            item
                            xs={12}
                            sm={6}
                            md={3}
                            marginTop={2}
                            paddingRight={2}>
                            <Card
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
                                                fontSize: 20,
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
                                        variant="card"
                                        onClick={(e) =>
                                            viewAquariumDetail(aquarium)
                                        }>
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
