// We will need express, pool, and router from express.Router

const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// GET Route
// Add in something to only get logged in user's aquariums
router.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        const sql = `SELECT * FROM "aquarium"
        WHERE "user_id" = $1;
        `;
        pool.query(sql, [req.user.id])
            .then((result) => {
                res.send(result.rows);
            })
            .catch((e) => {
                console.log("Error getting all aquariums", e);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403); // Send Forbidden if these are not the user's aquariums
    }
});

// GET Route by id
router.get("/:id", (req, res) => {
    if (req.isAuthenticated()) {
        const sql = `
        SELECT "product"."id", "aquarium_id", "description", "cost", "product_type_id" FROM "aquarium" 
        JOIN "product" ON "aquarium"."id" = "product"."aquarium_id"
        WHERE "aquarium_id" = $1 and "user_id" = $2;
        `;
        pool.query(sql, [req.params.id, req.user.id])
            .then((result) => {
                res.send(result.rows);
            })
            .catch((e) => {
                console.log("Error getting specific aquarium", e);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403); // Send Forbidden if these are not the user's aquariums
    }
});

module.exports = router;
