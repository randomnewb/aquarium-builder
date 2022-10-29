import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import { Typography, TextField } from "@mui/material";
import { Container } from "@mui/system";
import "../../css/PlainTextField.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

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
            <Container>
                <Typography
                    variant="h3"
                    textAlign="center"
                    sx={{ fontFamily: "Rubik" }}>
                    Enter in the Details of the New Aquarium
                </Typography>
                <br />
                <TextField
                    autoFocus
                    variant="filled"
                    fullWidth
                    className="textfield"
                    // sx={{
                    //     input: {
                    //         color: "black",
                    //         backgroundColor: "#F2DDA6",
                    //         fontFamily: "Rubik",
                    //     },
                    // }}
                    // InputLabelProps={{ style: { color: "red" } }}
                    type="text"
                    label="Name"
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
                <br />

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
                        value="livestock">
                        livestock
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
                        value="plant">
                        plant
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
                        value="rock">
                        rock
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
                        value="driftwood">
                        driftwood
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
                        value="substrate">
                        substrate
                    </MenuItem>
                </Select>
                {/* <input
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
                <label htmlFor="substrate">Substrate</label> */}
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
                            <ul key={item.id}>
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
                                    {/* {item.id} */}
                                    Type: {item.productType}, Label:
                                    {item.typeDescription}, Cost: ${item.cost}
                                </li>
                            </ul>
                        );
                    })}
                </div>
                <Button
                    onClick={(e) => newAquarium(e)}
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
                    Finish Creating Aquarium
                </Button>
            </Container>
        </>
    );
};

export default CreateAquarium;
