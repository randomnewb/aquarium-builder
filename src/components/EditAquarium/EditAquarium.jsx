import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const EditAquarium = () => {
    const aquarium = useSelector((store) => store.aquariums.specificAquarium);
    const [id, setId] = useState(aquarium.id);
    const [name, setName] = useState(aquarium.name);

    const dispatch = useDispatch();
    const history = useHistory();

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
