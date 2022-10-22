import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

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

    return (
        <>
            <h2>Edit the Details of the Aquarium</h2>
            <form onSubmit={(e) => editAquarium(e)}>
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
                    value="Finish Editing Aquarium"
                />
            </form>

            <button onClick={() => deleteAquarium(aquarium)}>
                Delete Aquarium
            </button>
        </>
    );
};

export default EditAquarium;
