const express = require("express");
const {
    rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get("/", rejectUnauthenticated, (req, res) => {
    // Send back user object from the session (previously queried from the database)
    res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post("/register", (req, res, next) => {
    const username = req.body.username;
    const password = encryptLib.encryptPassword(req.body.password);

    const queryText = `INSERT INTO "user" (username, password)
    VALUES ($1, $2) RETURNING id`;
    pool.query(queryText, [username, password])
        .then(() => res.sendStatus(201))
        .catch((err) => {
            console.log("User registration failed: ", err);
            res.sendStatus(500);
        });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
    res.sendStatus(200);
});

// clear all server session information about this user
router.post("/logout", (req, res) => {
    // Use passport's built-in method to log out the user
    req.logout();
    res.sendStatus(200);
});

router.put("/:id", (req, res) => {
    console.log("Update user: ", req.params.id, req.body);
    if (req.isAuthenticated) {
        const sql = `UPDATE "user" 
    SET favorite_plant = $1, 
    favorite_animal = $2,
    aquascaping_style = $3,
    years_hobby = $4,
    avatar = $5,
    description = $6
    WHERE id = $7;
    `;
        pool.query(sql, [
            req.body.favorite_plant,
            req.body.favorite_animal,
            req.body.aquascaping_style,
            req.body.years_hobby,
            req.body.avatar,
            req.body.description,
            req.params.id,
        ])
            .then((result) => {
                res.sendStatus(201);
            })
            .catch((e) => {
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(401);
    }
});

module.exports = router;
