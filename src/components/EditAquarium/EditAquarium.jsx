import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const EditAquarium = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const aquarium = useSelector((store) => store.aquariums.specificAquarium);
    const [name, setName] = useState(aquarium.name);
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
    }, [aquarium]);

    const editAquarium = (e) => {
        e.preventDefault();
        console.log("Editing aquarium");
        dispatch({
            type: "PUT_AQUARIUM",
            payload: { id: id, name: name },
        });

        if (
            confirm(
                "Are you sure you want to complete the aquarium editing process?"
            )
        ) {
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
            </form>
        </>
    );
};

export default EditAquarium;
