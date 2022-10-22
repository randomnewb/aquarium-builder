import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const CreateAquarium = () => {
    const [name, setName] = useState("");
    const [length, setLength] = useState("");
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [note, setNote] = useState("");
    const [image_url, setImage_url] = useState("");

    const dispatch = useDispatch();
    const history = useHistory();

    const newAquarium = (e) => {
        e.preventDefault();
        console.log("Adding a new aquarium");
        dispatch({
            type: "POST_AQUARIUM",
            payload: {
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
                <br />
                <input
                    type="number"
                    placeholder="Length of aquarium"
                    name="length"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                />

                <br />
                <input
                    type="number"
                    placeholder="Width of aquarium"
                    name="width"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                />
                <br />
                <input
                    type="number"
                    placeholder="Height of aquarium"
                    name="height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                />
                <br />
                <input
                    type="text"
                    placeholder="Note"
                    name="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
                <br />
                <input
                    type="text"
                    placeholder="Input complete image_url"
                    name="image_url"
                    value={image_url}
                    onChange={(e) => setImage_url(e.target.value)}
                />
                <br />
                <input
                    type="submit"
                    value="Finish Creating Aquarium"
                />
            </form>
        </>
    );
};

export default CreateAquarium;
