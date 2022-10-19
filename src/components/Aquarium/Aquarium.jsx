// useEffect for displaying our specific aquarium on page load
import React, { useEffect } from "react";

// We need dispatch for our sagas
// useSelector to access our reducer/store
import { useDispatch, useSelector } from "react-redux";

// Need to import useParams so that we can obtain and use the id of the aquarium
import { useParams } from "react-router-dom";

const Aquarium = () => {
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
        </div>
    );
};

export default Aquarium;
