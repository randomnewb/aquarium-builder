/*

    This view displays the details of the chosen aquarium.
    Users can see the basic details as well as the list of livestock/items (products).
    Users have access to several actions: Return to Dashboard, Edit Aquarium, Delete Aquarium

*/

// useEffect for displaying our specific aquarium on page load
import React, { useEffect } from "react";

// We need dispatch for our sagas
// useSelector to access our reducer/store
import { useDispatch, useSelector } from "react-redux";

// Need to import useParams so that we can obtain and use the id of the aquarium
// Import useHistory so we can go back /home when we're done
import { useParams, useHistory } from "react-router-dom";

import Button from "@mui/material/Button";
import { Typography, Paper } from "@mui/material";
import { Container } from "@mui/system";
import "../../css/PlainTextField.css";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import LabelIcon from "@mui/icons-material/Label";
import CommentIcon from "@mui/icons-material/Comment";

const Aquarium = () => {
    const history = useHistory();

    const aquarium = useSelector((store) => store.aquariums.specificAquarium);
    const products = useSelector((store) => store.products.allProducts);
    // id matches Route and exact path from App.jsx "/aquarium/:id
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: "FETCH_AQUARIUM",
            payload: id,
        });
        dispatch({
            type: "FETCH_PRODUCTS",
            payload: id,
        });
        // Fetch specific aquarium whenever the id changes
    }, [id]);

    const deleteAquarium = (aquarium) => {
        console.log("In delete aquarium");
        if (confirm("Are you sure you want to delete this aquarium?")) {
            dispatch({
                type: "DELETE_AQUARIUM",
                payload: aquarium,
            });
            history.push("/home");
        }
    };

    const editAquarium = (aquarium) => {
        console.log("In edit aquarium");
        history.push(`/edit/${aquarium.id}`);
    };

    return (
        <>
            <Container>
                <Typography variant="h4">Aquarium Information</Typography>
                <br />
                <Paper
                    elevation={12}
                    sx={{ p: 3, backgroundColor: "#0F506E", color: "white" }}>
                    {/* {JSON.stringify(products)} */}
                    <Typography
                        variant="h4"
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
                        variant="h4"
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
                        variant="h4"
                        noWrap>
                        <CommentIcon
                            sx={{
                                verticalAlign: -2,
                                fontSize: 20,
                            }}
                        />{" "}
                        {aquarium.note}
                    </Typography>
                    <br />
                    <Typography variant="h6">
                        <img
                            src={aquarium.image_url}
                            width={400}
                            maxheight="true"
                            className="drop"></img>
                    </Typography>
                </Paper>
                <br />
                <Typography variant="h4">
                    Current Organisms and Items in Aquarium
                </Typography>
                <br />
                <Paper
                    elevation={12}
                    sx={{ p: 3, backgroundColor: "#0F506E", color: "white" }}>
                    {products.map((item) => {
                        return (
                            <Typography variant="h5">
                                <ul key={item.id}>
                                    <li>
                                        {item.productType}:{" "}
                                        {item.typeDescription}, Cost: $
                                        {item.cost}
                                    </li>
                                </ul>
                            </Typography>
                        );
                    })}
                </Paper>
                <br />
                <br />
                <Button
                    onClick={() => history.push("/user")}
                    sx={{
                        textTransform: "none",
                        backgroundColor: "#EAB06E",
                        color: "black",

                        ":hover": {
                            bgcolor: "#F2DDA6",
                            color: "black",
                        },
                    }}
                    style={{
                        maxWidth: "400px",
                        maxHeight: "100px",
                        minWidth: "400px",
                        minHeight: "10px",
                        lineHeight: "50px",
                        fontSize: "30px",
                    }}>
                    Return to Dashboard
                </Button>
                <br />
                <br />
                <Button
                    onClick={() => editAquarium(aquarium)}
                    sx={{
                        textTransform: "none",
                        backgroundColor: "#EAB06E",
                        color: "black",

                        ":hover": {
                            bgcolor: "#F2DDA6",
                            color: "black",
                        },
                    }}
                    style={{
                        maxWidth: "400px",
                        maxHeight: "100px",
                        minWidth: "400px",
                        minHeight: "10px",
                        lineHeight: "50px",
                        fontSize: "30px",
                    }}>
                    Edit Aquarium
                </Button>
                <br />
                <br />
                <Button
                    onClick={() => deleteAquarium(aquarium)}
                    sx={{
                        textTransform: "none",
                        backgroundColor: "#EAB06E",
                        color: "black",

                        ":hover": {
                            bgcolor: "#F2DDA6",
                            color: "black",
                        },
                    }}
                    style={{
                        maxWidth: "400px",
                        maxHeight: "100px",
                        minWidth: "400px",
                        minHeight: "10px",
                        lineHeight: "50px",
                        fontSize: "30px",
                    }}>
                    Delete Aquarium
                </Button>
            </Container>
        </>
    );
};

export default Aquarium;
