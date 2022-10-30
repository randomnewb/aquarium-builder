import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";
import SetMealIcon from "@mui/icons-material/SetMeal";

function Nav() {
    const user = useSelector((store) => store.user);

    return (
        <div className="nav">
            <Link to="/home">
                <h2 className="nav-title">
                    <SetMealIcon
                        sx={{
                            verticalAlign: -8,
                            fontSize: 30,
                        }}
                    />
                    Aquarium Builder
                </h2>
            </Link>
            <div>
                {/* If no user is logged in, show these links */}
                {!user.id && (
                    // If there's no user, show login/registration links
                    <Link
                        className="navLink"
                        to="/login">
                        Login / Register
                    </Link>
                )}
                {!user.id && (
                    <Link
                        className="navLink"
                        to="/about">
                        About
                    </Link>
                )}

                {/* If a user is logged in, show these links */}
                {user.id && (
                    <>
                        <Link
                            className="navLink"
                            to="/user">
                            Dashboard
                        </Link>
                        <Link
                            className="navLink"
                            to="/setup">
                            Create
                        </Link>

                        {/* <Link
                            className="navLink"
                            to="/info">
                            Info Page
                        </Link> */}
                        <Link
                            className="navLink"
                            to="/about">
                            About
                        </Link>

                        <LogOutButton className="navLink" />
                    </>
                )}
            </div>
        </div>
    );
}

export default Nav;
