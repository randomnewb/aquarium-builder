import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { TextField, Button, Typography, Grid } from "@mui/material";
import { useHistory } from "react-router-dom";

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const errors = useSelector((store) => store.errors);
    const dispatch = useDispatch();
    const history = useHistory();

    const login = (event) => {
        event.preventDefault();

        if (username && password) {
            dispatch({
                type: "LOGIN",
                payload: {
                    username: username,
                    password: password,
                },
            });
        } else {
            dispatch({ type: "LOGIN_INPUT_ERROR" });
        }
    }; // end login

    return (
        <>
            <Grid
                item
                xs={4}
                style={{ textAlign: "center" }}>
                <Typography
                    variant="h2"
                    sx={{ fontFamily: "Rubik" }}>
                    Login
                </Typography>
                <br />

                {errors.loginMessage && (
                    <h3
                        className="alert"
                        role="alert">
                        {errors.loginMessage}
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
                <div>
                    <Button
                        type="button"
                        className="btn btn_asLink"
                        onClick={() => {
                            history.push("/registration");
                        }}
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
                            maxWidth: "250px",
                            maxHeight: "100px",
                            minWidth: "250px",
                            minHeight: "10px",
                            lineHeight: "50px",
                            fontSize: "20px",
                            marginRight: "10px",
                        }}>
                        Register New Account
                    </Button>
                    <Button
                        onClick={login}
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
                            maxWidth: "200px",
                            maxHeight: "100px",
                            minWidth: "200px",
                            minHeight: "10px",
                            lineHeight: "50px",
                            fontSize: "20px",
                        }}>
                        Complete Log In
                    </Button>
                </div>
            </Grid>
        </>
    );
}

export default LoginForm;
