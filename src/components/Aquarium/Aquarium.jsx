// useEffect for displaying our specific aquarium on page load
import React, { useEffect } from "react";

// We need dispatch for our sagas
// useSelector to access our reducer/store
import { useDispatch, useSelector } from "react-redux";

// Need to import useParams so that we can obtain and use the id of the aquarium
import { useParams } from "react-router-dom";

// Import useHistory so we can go back /home when we're done
import { useHistory } from "react-router-dom";

const Aquarium = () => {
    const history = useHistory();

    const aquarium = useSelector((store) => store.aquariums.specificAquarium);
    // id matches Route and exact path from App.jsx "/aquarium/:id
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: "FETCH_AQUARIUM",
            payload: id,
        });
        // Fetch specific aquarium whenever the id changes
    }, [id]);

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
        <div>
            <h6> {aquarium.name}</h6>
            <h6> Length: {aquarium.length}</h6>
            <h6> Width: {aquarium.width}</h6>
            <h6> Height: {aquarium.height}</h6>
            <h6> Note: {aquarium.note}</h6>
            <h6>
                <img src={aquarium.image_url}></img>
            </h6>
            <button onClick={() => deleteAquarium(aquarium)}>
                Delete Aquarium
            </button>
        </div>
    );
};

export default Aquarium;
