import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { TextField, Button, Typography, Grid } from "@mui/material";
import { useHistory } from "react-router-dom";

function RegisterForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const errors = useSelector((store) => store.errors);
    const dispatch = useDispatch();
    const history = useHistory();

    const registerUser = (event) => {
        event.preventDefault();

        dispatch({
            type: "REGISTER",
            payload: {
                username: username,
                password: password,
            },
        });
    }; // end registerUser

    return (
        <Grid
            item
            xs={4}
            style={{ textAlign: "center" }}>
            <Typography
                variant="h2"
                sx={{ fontFamily: "Rubik" }}>
                Register User
            </Typography>
            <br />

            {errors.registrationMessage && (
                <h3
                    className="alert"
                    role="alert">
                    {errors.registrationMessage}
                </h3>
            )}
            <div>
                <TextField
                    autoFocus
                    variant="filled"
                    className="textfield"
                    type="text"
                    name="username"
                    required
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    label="Username"
                />
            </div>
            <div>
                <TextField
                    variant="filled"
                    className="textfield"
                    type="password"
                    name="password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    label="Password"
                />
            </div>
            <br />
            <Button
                // className="btn"
                className="btn btn_asLink"
                onClick={() => {
                    history.push("/login");
                }}
                type="button"
                name="submit"
                value="Log In"
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
                    maxWidth: "180px",
                    maxHeight: "100px",
                    minWidth: "180px",
                    minHeight: "10px",
                    lineHeight: "50px",
                    fontSize: "20px",
                    marginRight: "10px",
                }}>
                Return to Login
            </Button>
            <Button
                type="button"
                className="btn btn_asLink"
                onClick={registerUser}
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
                    maxWidth: "230px",
                    maxHeight: "100px",
                    minWidth: "230px",
                    minHeight: "10px",
                    lineHeight: "50px",
                    fontSize: "20px",
                    marginRight: "10px",
                }}>
                Complete Registration
            </Button>
        </Grid>
    );
}

export default RegisterForm;
