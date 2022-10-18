// Import useEffect to show user's aquariums on page load
import React, { useEffect } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";

// Import useDispatch so that we can click on specific aquariums to view their detail
import { useSelector, useDispatch } from "react-redux";

function UserPage() {
    // Use dispatch so that we can FETCH aquariums
    const dispatch = useDispatch();

    // Pull all the user's aquariums from the store
    const aquariums = useSelector((store) => store.aquariums);

    // FETCH our aquariums on load
    useEffect(() => {
        dispatch({ type: "FETCH_AQUARIUMS" });
    }, []);

    // this component doesn't do much to start, just renders some user reducer info to the DOM
    const user = useSelector((store) => store.user);
    return (
        <div className="container">
            <h2>Welcome, {user.username}!</h2>
            <p>Your ID is: {user.id}</p>
            <LogOutButton className="btn" />

            {/* Aquariums will be displayed here along with create aquarium button */}
            <p> Aquariums go here </p>

            {/* Uncomment block below once there are aquariums to FETCH */}
            {/* {aquariums.map((aquarium) => {
                return (
                    <div key={aquarium.id}>
                        <h6> {aquarium.name}</h6>
                    </div>
                );
            })} */}

            <p> Create aquarium button goes here</p>
        </div>
    );
}

// this allows us to use <App /> in index.js
export default UserPage;
