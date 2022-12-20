import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { Typography, TextField } from "@mui/material";
import { Container } from "@mui/system";
import "../../css/PlainTextField.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const EditAquarium = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const aquarium = useSelector((store) => store.aquariums.specificAquarium);
    const product = useSelector((store) => store.products.allProducts);
    const lastId = useSelector((store) => store.products.lastProductId);

    const [name, setName] = useState(aquarium.name);
    const [length, setLength] = useState(aquarium.length);
    const [width, setWidth] = useState(aquarium.width);
    const [height, setHeight] = useState(aquarium.height);
    const [note, setNote] = useState(aquarium.note);
    const [image_url, setImage_url] = useState(aquarium.image_url);
    const [productType, setProductType] = useState("Livestock");
    const [typeDescription, setTypeDescription] = useState("");
    const [cost, setCost] = useState(0);
    const [products, setProducts] = useState(product);
    const [productId, setProductId] = useState(lastId.id);
    const { id } = useParams();
    const [deleteProducts, setDeleteProducts] = useState([]);
    const [newProducts, setNewProducts] = useState([]);

    useEffect(() => {
        dispatch({
            type: "FETCH_AQUARIUM",
            payload: id,
        });

        dispatch({
            type: "FETCH_PRODUCTS",
            payload: id,
        });

        dispatch({
            type: "FETCH_LAST_PRODUCT_ID",
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
        setProducts(product);
        setProductId(lastId.id);
    }, [aquarium, product]);

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
                product: newProducts,
                deleteProducts: deleteProducts,
            },
        });

        dispatch({
            type: "SET_LAST_PRODUCT_ID",
            payload: { id: productId + 1 },
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

    const addSingleItem = () => {
        setProductId(productId + 1);
        console.log("the product id is", productId);
        setProducts((products) => [
            ...products,
            { productId, productType, typeDescription, cost },
        ]);
        setNewProducts((newProducts) => [
            ...newProducts,
            { productId, productType, typeDescription, cost },
        ]);
        setProductType("Livestock");
        setTypeDescription("");
        setCost(0);
    };

    const deleteProductItem = (e, itemToDelete) => {
        e.preventDefault();
        setProducts((products) =>
            products.filter(
                (items) => items.productId !== itemToDelete.productId
            )
        );
        setNewProducts((newProducts) =>
            newProducts.filter(
                (items) => items.productId !== itemToDelete.productId
            )
        );

        let search = newProducts.indexOf(itemToDelete.productId);
        if (search === -1) {
            setDeleteProducts((deleteProducts) => [
                ...deleteProducts,
                itemToDelete.productId,
            ]);
        } else {
            console.log(
                "Found it, do not add it to list to delete from database"
            );
        }
        console.log("what are we going to delete?", deleteProducts);
    };

    const previousPage = (e) => {
        console.log("Go to previous page");
        if (
            confirm(
                "Are you sure you want to cancel and go back to the previous page?"
            )
        ) {
            history.goBack();
        }
    };

    return (
        <>
            <Container>
                <Typography
                    variant="h3"
                    textAlign="center"
                    sx={{ fontFamily: "Rubik" }}>
                    Edit the Details of the Aquarium
                </Typography>
                <br />
                <TextField
                    autoFocus
                    variant="filled"
                    fullWidth
                    className="textfield"
                    label="Name of aquarium"
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br />
                <TextField
                    variant="filled"
                    fullWidth
                    className="textfield"
                    label="Length of aquarium (inches)"
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    name="length"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                />
                <br />
                <TextField
                    variant="filled"
                    fullWidth
                    className="textfield"
                    label="Width of aquarium (inches)"
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    name="width"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                />
                <br />
                <TextField
                    variant="filled"
                    fullWidth
                    className="textfield"
                    label="Height of aquarium (inches)"
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    name="height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                />
                <br />
                <TextField
                    variant="filled"
                    fullWidth
                    className="textfield"
                    label="Note"
                    type="text"
                    name="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
                <br />
                <TextField
                    variant="filled"
                    fullWidth
                    className="textfield"
                    label="Input the complete image url"
                    type="text"
                    name="image_url"
                    value={image_url}
                    onChange={(e) => setImage_url(e.target.value)}
                />
                <h3>
                    If you would like to add an organism or item, please select
                    a category below.
                </h3>
                <InputLabel>Type</InputLabel>
                <Select
                    sx={{
                        backgroundColor: "#F2DDA6",
                        color: "black",
                    }}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                bgcolor: "#F2DDA6",
                            },
                        },
                    }}
                    value={productType}
                    label="Type"
                    onChange={(e) => setProductType(e.target.value)}>
                    <MenuItem
                        style={{
                            backgroundColor: "#F2DDA6",
                            color: "black",
                        }}
                        sx={{
                            "&:hover": {
                                bgcolor: "#EAB06E !important",
                                color: "black",
                            },
                        }}
                        value="Livestock">
                        Livestock
                    </MenuItem>
                    <MenuItem
                        style={{
                            backgroundColor: "#F2DDA6",
                            color: "black",
                        }}
                        sx={{
                            "&:hover": {
                                bgcolor: "#EAB06E !important",
                                color: "black",
                            },
                        }}
                        value="Plant">
                        Plant
                    </MenuItem>
                    <MenuItem
                        style={{
                            backgroundColor: "#F2DDA6",
                            color: "black",
                        }}
                        sx={{
                            "&:hover": {
                                bgcolor: "#EAB06E !important",
                                color: "black",
                            },
                        }}
                        value="Rock">
                        Rock
                    </MenuItem>
                    <MenuItem
                        style={{
                            backgroundColor: "#F2DDA6",
                            color: "black",
                        }}
                        sx={{
                            "&:hover": {
                                bgcolor: "#EAB06E !important",
                                color: "black",
                            },
                        }}
                        value="Driftwood">
                        Driftwood
                    </MenuItem>
                    <MenuItem
                        style={{
                            backgroundColor: "#F2DDA6",
                            color: "black",
                        }}
                        sx={{
                            "&:hover": {
                                bgcolor: "#EAB06E !important",
                                color: "black",
                            },
                        }}
                        value="Substrate">
                        Substrate
                    </MenuItem>
                </Select>
                <br />
                <h3>
                    Then, type in the name and cost (if any). Next, choose
                    "add". It will appear below. You can remove temporarily
                    added items with "remove" from the list.
                </h3>
                <TextField
                    variant="filled"
                    fullWidth
                    className="textfield"
                    label="Name of organism/item"
                    type="text"
                    name="typeDescription"
                    value={typeDescription}
                    onChange={(e) => setTypeDescription(e.target.value)}
                />
                <br />
                <TextField
                    variant="filled"
                    fullWidth
                    className="textfield"
                    label="Cost of item"
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    name="cost"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                />
                {/* Last productId is: {productId} */}
                <br />
                <br />
                <Button
                    onClick={addSingleItem}
                    sx={{
                        textTransform: "none",
                        backgroundColor: "#EAB06E",
                        color: "black",

                        ":hover": {
                            bgcolor: "#F2DDA6",
                            color: "black",
                        },
                    }}
                    style={{
                        maxWidth: "200px",
                        maxHeight: "50px",
                        minWidth: "200px",
                        minHeight: "50px",
                        lineHeight: "25px",
                        fontSize: "20px",
                    }}>
                    Add Organism/Item
                </Button>
                <h3>
                    When you are completely done, please press "Finish Creating
                    Aquarium" to save the aquarium.
                </h3>
                <br />
                <br />
                <div>
                    <Typography sx={{ textDecoration: "underline" }}>
                        Current Organisms and Items in Aquarium
                    </Typography>
                    {products.map((item) => {
                        return (
                            <ul key={item.productId}>
                                <li>
                                    <Button
                                        onClick={(e) =>
                                            deleteProductItem(e, item)
                                        }
                                        sx={{
                                            textTransform: "none",
                                            backgroundColor: "#EAB06E",
                                            color: "black",

                                            ":hover": {
                                                bgcolor: "#F2DDA6",
                                                color: "black",
                                            },
                                        }}>
                                        Remove
                                    </Button>
                                    {/* Item ID: {item.id} */}
                                    Type: {item.productType}, Label:{" "}
                                    {item.typeDescription}, Cost: ${item.cost}
                                </li>
                            </ul>
                        );
                    })}
                </div>
                <br />
                <br />
                <Button
                    onClick={(e) => previousPage(e)}
                    sx={{
                        textTransform: "none",
                        backgroundColor: "#EAB06E",
                        color: "black",

                        ":hover": {
                            bgcolor: "#F2DDA6",
                            color: "black",
                        },
                    }}
                    style={{
                        maxWidth: "400px",
                        maxHeight: "100px",
                        minWidth: "400px",
                        minHeight: "10px",
                        lineHeight: "50px",
                        fontSize: "30px",
                    }}>
                    Cancel Editing
                </Button>
                <br />
                <br />
                <Button
                    onClick={() => deleteAquarium(aquarium)}
                    sx={{
                        textTransform: "none",
                        backgroundColor: "#EAB06E",
                        color: "black",

                        ":hover": {
                            bgcolor: "#F2DDA6",
                            color: "black",
                        },
                    }}
                    style={{
                        maxWidth: "400px",
                        maxHeight: "100px",
                        minWidth: "400px",
                        minHeight: "10px",
                        lineHeight: "50px",
                        fontSize: "30px",
                    }}>
                    Delete Aquarium
                </Button>
                <br />
                <br />
                <Button
                    onClick={(e) => editAquarium(e)}
                    sx={{
                        textTransform: "none",
                        backgroundColor: "#EAB06E",
                        color: "black",

                        ":hover": {
                            bgcolor: "#F2DDA6",
                            color: "black",
                        },
                    }}
                    style={{
                        maxWidth: "400px",
                        maxHeight: "100px",
                        minWidth: "400px",
                        minHeight: "10px",
                        lineHeight: "50px",
                        fontSize: "30px",
                    }}>
                    Finish Editing Aquarium
                </Button>
            </Container>
        </>
    );
};

export default EditAquarium;
