import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const CreateAquarium = () => {
    const [name, setName] = useState("");
    const [length, setLength] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [note, setNote] = useState("");
    const [image_url, setImage_url] = useState("");
    const [productType, setProductType] = useState("livestock");
    const [typeDescription, setTypeDescription] = useState("");
    const [cost, setCost] = useState(0);
    const [id, setId] = useState(0);
    const [products, setProducts] = useState([]);

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
                product: products,
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

    // const addSingleItem = (e) => {
    //     e.preventDefault();
    //     console.log(
    //         "Adding a single item with type:",
    //         productType,
    //         "and description:",
    //         typeDescription
    //     );
    //     products.push({ productType, typeDescription });
    //     console.log("Produts is", products);
    // };

    const addSingleItem = () => {
        console.log(
            "type and description are",
            productType,
            typeDescription,
            "products length is",
            products.length,
            "products are",
            products
        );
        setId(id + 1);
        setProducts((products) => [
            ...products,
            { id, productType, typeDescription, cost },
        ]);
        setProductType("livestock");
        setTypeDescription("");
        setCost(0);
    };

    const deleteProductItem = (e, itemToDelete) => {
        e.preventDefault();
        setProducts((products) =>
            products.filter((items) => items.id !== itemToDelete.id)
        );
    };

    return (
        <>
            <h2>Enter in the Details of the New Aquarium</h2>

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

            <h6>
                If you would like to add an item, please select a category
                below.
            </h6>
            <input
                type="radio"
                name={productType}
                value="livestock"
                checked={productType === "livestock"}
                onChange={(e) => setProductType(e.target.value)}
            />
            <label htmlFor="livestock">Livestock</label>
            <br />
            <input
                type="radio"
                name={productType}
                value="plant"
                checked={productType === "plant"}
                onChange={(e) => setProductType(e.target.value)}
            />
            <label htmlFor="plant">Plant</label>
            <br />
            <input
                type="radio"
                name={productType}
                value="rock"
                checked={productType === "rock"}
                onChange={(e) => setProductType(e.target.value)}
            />
            <label htmlFor="rock">Rock</label>
            <br />
            <input
                type="radio"
                name={productType}
                value="driftwood"
                checked={productType === "driftwood"}
                onChange={(e) => setProductType(e.target.value)}
            />
            <label htmlFor="driftwood">Driftwood</label>
            <br />
            <input
                type="radio"
                name={productType}
                value="substrate"
                checked={productType === "substrate"}
                onChange={(e) => setProductType(e.target.value)}
            />
            <label htmlFor="substrate">Substrate</label>
            <br />
            <h6>
                Then, type in the name and cost (if any) of that item. Add it
                with "add item". It will appear below. You can remove
                temporarily added items with "remove".
            </h6>
            <input
                type="text"
                placeholder="Name of item"
                name="typeDescription"
                value={typeDescription}
                onChange={(e) => setTypeDescription(e.target.value)}
            />
            <br />
            <input
                type="number"
                placeholder="Cost of item"
                name="cost"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
            />
            <br />
            <button onClick={addSingleItem}>Add item</button>
            <h6>
                When you are completely done, please press "Finish Creating
                Aquarium" to save the aquarium.
            </h6>
            <div>
                <h4>Current Items in Aquarium</h4>
                {products.map((item) => {
                    return (
                        <ul key={item.id}>
                            <li>
                                {item.id}:{item.productType}:
                                {item.typeDescription}:${item.cost}
                                <button
                                    onClick={(e) => deleteProductItem(e, item)}>
                                    Remove
                                </button>
                            </li>
                        </ul>
                    );
                })}
            </div>
            <button onClick={(e) => newAquarium(e)}>
                Finish Creating Aquarium
            </button>
        </>
    );
};

export default CreateAquarium;
