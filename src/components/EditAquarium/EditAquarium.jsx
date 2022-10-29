import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import { Typography, TextField } from "@mui/material";
import { Container } from "@mui/system";
import "../../css/PlainTextField.css";

const EditAquarium = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const aquarium = useSelector((store) => store.aquariums.specificAquarium);
    const [name, setName] = useState(aquarium.name);
    const [length, setLength] = useState(aquarium.length);
    const [width, setWidth] = useState(aquarium.width);
    const [height, setHeight] = useState(aquarium.height);
    const [note, setNote] = useState(aquarium.note);
    const [image_url, setImage_url] = useState(aquarium.image_url);
    const { id } = useParams();

    useEffect(() => {
        // axios
        //     .get(`/api/aquarium/${id}`)
        //     .then((response) => {
        //         setName(response.data.name);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         alert("Something went wrong");
        //     });

        dispatch({
            type: "FETCH_AQUARIUM",
            payload: id,
        });

        // Fetch specific aquarium whenever the id changes
    }, [id, dispatch]);

    useEffect(() => {
        setName(aquarium.name);
        setLength(aquarium.length);
        setWidth(aquarium.width);
        setHeight(aquarium.height);
        setNote(aquarium.note);
        setImage_url(aquarium.image_url);
    }, [aquarium]);

    const editAquarium = (e) => {
        e.preventDefault();
        console.log("Editing aquarium");
        dispatch({
            type: "PUT_AQUARIUM",
            payload: {
                id: id,
                name: name,
                length: length,
                width: width,
                height: height,
                note: note,
                image_url: image_url,
            },
        });

        if (
            confirm(
                "Are you sure you want to complete the aquarium editing process?"
            )
        ) {
            history.push("/home");
        }
    };

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

    const previousPage = (e) => {
        console.log("Go to previous page");
        if (
            confirm(
                "Are you sure you want to cancel and go back to the previous page?"
            )
        ) {
            history.goBack();
        }
    };

    return (
        <>
            <Container>
                <Typography
                    variant="h3"
                    textAlign="center"
                    sx={{ fontFamily: "Rubik" }}>
                    Edit the Details of the Aquarium
                </Typography>
                <br />
                <TextField
                    autofocus
                    variant="filled"
                    fullWidth="true"
                    className="textfield"
                    label="Name of aquarium"
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br />
                <TextField
                    variant="filled"
                    fullWidth="true"
                    className="textfield"
                    label="Length of aquarium (inches)"
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    name="length"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                />

                <br />
                <TextField
                    variant="filled"
                    fullWidth="true"
                    className="textfield"
                    label="Width of aquarium (inches)"
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    name="width"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                />
                <br />
                <TextField
                    variant="filled"
                    fullWidth="true"
                    className="textfield"
                    label="Height of aquarium (inches)"
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    name="height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                />
                <br />
                <TextField
                    variant="filled"
                    fullWidth="true"
                    className="textfield"
                    label="Note"
                    type="text"
                    name="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
                <br />
                <TextField
                    variant="filled"
                    fullWidth="true"
                    className="textfield"
                    label="Input the complete image url"
                    type="text"
                    name="image_url"
                    value={image_url}
                    onChange={(e) => setImage_url(e.target.value)}
                />
                <br />
                <br />
                <Button
                    onClick={(e) => previousPage(e)}
                    sx={{
                        textTransform: "none",
                        backgroundColor: "#EAB06E",
                        color: "black",

                        ":hover": {
                            bgcolor: "#F2DDA6",
                            color: "black",
                        },
                    }}>
                    Cancel Editing
                </Button>
                <br />
                <br />
                <Button
                    onClick={(e) => editAquarium(e)}
                    sx={{
                        textTransform: "none",
                        backgroundColor: "#EAB06E",
                        color: "black",

                        ":hover": {
                            bgcolor: "#F2DDA6",
                            color: "black",
                        },
                    }}>
                    Finish Editing Aquarium
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
                    }}>
                    Delete Aquarium
                </Button>
            </Container>
        </>
    );
};

export default EditAquarium;
