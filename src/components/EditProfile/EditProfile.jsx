import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { Typography, TextField, Paper } from "@mui/material";
import { Container } from "@mui/system";

const Profile = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector((store) => store.user);

    const [plant, setPlant] = useState(user.favorite_plant);
    const [animal, setAnimal] = useState(user.favorite_animal);
    const [style, setStyle] = useState(user.aquascaping_style);
    const [year, setYear] = useState(user.years_hobby);
    const [about, setAbout] = useState(user.description);
    const [image, setImage] = useState(user.avatar);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    // useEffect(() => {
    //     dispatch({
    //         type: "FETCH_USER",
    //     });
    // }, [id]);

    // useEffect(() => {
    //     setPlant(user.favorite_plant);
    // }, [user]);

    const updateProfile = (e) => {
        e.preventDefault();
        console.log("Editing aquarium");
        dispatch({
            type: "UPDATE_USER",
            payload: {
                id: id,
                favorite_plant: plant,
                favorite_animal: animal,
                aquascaping_style: style,
                years_hobby: year,
                description: about,
                avatar: image,
            },
        });
        history.push("/profile");
    };

    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "images");
        setLoading(true);

        const res = await fetch(
            "https://api.cloudinary.com/v1_1/dartlv0ee/image/upload",
            {
                method: "POST",
                body: data,
            }
        );

        const file = await res.json();
        console.log(file);
        setImage(file.secure_url);
    };

    return (
        <Container>
            <Typography variant="h4">Edit Profile</Typography>
            <br />

            <TextField
                variant="filled"
                fullWidth
                className="textfield"
                label="Favorite Plant"
                type="text"
                name="plant"
                value={plant}
                onChange={(e) => setPlant(e.target.value)}
            />
            <br />
            <TextField
                variant="filled"
                fullWidth
                className="textfield"
                label="Favorite Animal"
                type="text"
                InputProps={{ inputProps: { min: 0 } }}
                name="animal"
                value={animal}
                onChange={(e) => setAnimal(e.target.value)}
            />
            <br />
            <TextField
                variant="filled"
                fullWidth
                className="textfield"
                label="Aquascaping Style"
                type="text"
                name="style"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
            />
            <br />
            <TextField
                variant="filled"
                fullWidth
                className="textfield"
                label="Share a short description about yourself"
                type="text"
                name="about"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
            />
            <br />
            <TextField
                variant="filled"
                fullWidth
                className="textfield"
                label="Years in the Hobby"
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                name="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
            />
            <br />
            <TextField
                variant="filled"
                fullWidth
                className="textfield"
                label="Upload a small image/avatar"
                type="file"
                name="image"
                onChange={uploadImage}
            />
            <br />
            <br />
            <Button
                onClick={(e) => updateProfile(e)}
                variant="action">
                Finish Editing Profile
            </Button>
        </Container>
    );
};

export default Profile;
