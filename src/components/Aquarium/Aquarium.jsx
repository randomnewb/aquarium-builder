// useEffect for displaying our specific aquarium on page load
import React, { useEffect } from "react";

// We need dispatch for our sagas
// useSelector to access our reducer/store
import { useDispatch, useSelector } from "react-redux";

// Need to import useParams so that we can obtain and use the id of the aquarium
// Import useHistory so we can go back /home when we're done
import { useParams, useHistory } from "react-router-dom";

const Aquarium = () => {
    const history = useHistory();

    const aquarium = useSelector((store) => store.aquariums.specificAquarium);
    const products = useSelector((store) => store.products);
    // id matches Route and exact path from App.jsx "/aquarium/:id
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: "FETCH_AQUARIUM",
            payload: id,
        });
        dispatch({
            type: "FETCH_PRODUCTS",
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

    const editAquarium = (aquarium) => {
        console.log("In edit aquarium");
        history.push(`/edit/${aquarium.id}`);
    };

    return (
        <div>
            {/* {JSON.stringify(products)} */}
            <h3> {aquarium.name}</h3>
            <h3> Length: {aquarium.length}</h3>
            <h3> Width: {aquarium.width}</h3>
            <h3> Height: {aquarium.height}</h3>
            <h3> Note: {aquarium.note}</h3>
            <img
                src={aquarium.image_url}
                style={{ width: 300 }}></img>
            <br />
            <div>
                <h4>Current Items in Aquarium</h4>
                {products.map((item) => {
                    return (
                        <ul key={item.id}>
                            <li>
                                {item.product_type_id}: {item.description},
                                Cost: ${item.cost}
                            </li>
                        </ul>
                    );
                })}
            </div>
            <br />
            <button onClick={() => editAquarium(aquarium)}>
                Edit Aquarium
            </button>
            <br />
            <button onClick={() => deleteAquarium(aquarium)}>
                Delete Aquarium
            </button>
        </div>
    );
};

export default Aquarium;
