import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LandingPage.css";

// CUSTOM COMPONENTS
import RegisterForm from "../RegisterForm/RegisterForm";

function LandingPage() {
    const [heading, setHeading] = useState("Welcome");
    const history = useHistory();

    const onLogin = (event) => {
        history.push("/login");
    };

    return (
        <div className="container">
            <div className="grid">
                <div className="grid-col grid-col_4"></div>
                <div className="grid-col grid-col_4">
                    <h2>{heading}</h2>
                    <p>
                        Please register a new account to begin building
                        aquariums or press login if you have already done so to
                        continue where you left off.
                    </p>
                    <RegisterForm />

                    <center>
                        <h4>Already a Member?</h4>
                        <button
                            className="btn btn_sizeSm"
                            onClick={onLogin}>
                            Login
                        </button>
                    </center>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
