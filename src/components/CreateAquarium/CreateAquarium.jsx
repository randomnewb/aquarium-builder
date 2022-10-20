import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const CreateAquarium = () => {
    const [name, setName] = useState("");

    const dispatch = useDispatch();
    const history = useHistory();

    const newAquarium = (e) => {
        e.preventDefault();
        console.log("Adding a new aquarium");
        dispatch({
            type: "POST_AQUARIUM",
            payload: { name: name },
        });

        if (
            confirm(
                "Are you sure you want to complete the aquarium creation process?"
            )
        ) {
            history.push("/home");
        }
    };

    return (
        <>
            <h2>Enter in the Details of the New Aquarium</h2>
            <form onSubmit={(e) => newAquarium(e)}>
                <input
                    type="text"
                    placeholder="Name of aquarium"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </form>
        </>
    );
};

{
    /* "name" VARCHAR (255),
	"length" INT,
	"width" INT,
	"height" INT,
	"note" VARCHAR (1000),
	"image_url" VARCHAR (3000) */
}

export default CreateAquarium;
