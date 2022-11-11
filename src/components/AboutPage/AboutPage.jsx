import React from "react";
import { Typography } from "@mui/material";

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
    return (
        <div className="container">
            <div>
                <Typography variant="h4">Thank you to:</Typography>
                <Typography variant="h5">
                    <ul>
                        <li> Family and friends</li>
                        <li> Saturday study groupmates</li>
                        <li> Prime instructor, Chris</li>
                        <li> Phrygian cohort</li>
                    </ul>
                </Typography>
                <Typography variant="h4">
                    Aquarium Builder was made with:
                </Typography>
                <Typography variant="h5">
                    <ul>
                        <li> React, Redux, Sagas</li>
                        <li> Node.js, Express.js, PostgresSQL</li>
                        <li> Styled with MaterialUI</li>
                    </ul>
                </Typography>
            </div>
        </div>
    );
}

export default AboutPage;
