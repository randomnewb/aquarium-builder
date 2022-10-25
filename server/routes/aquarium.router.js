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
        const sql = `SELECT * FROM "aquarium" WHERE "id"=$1 and "user_id" = $2`;
        pool.query(sql, [req.params.id, req.user.id])
            .then((result) => {
                res.send(result.rows[0]);
            })
            .catch((e) => {
                console.log("Error getting specific aquarium", e);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403); // Send Forbidden if these are not the user's aquariums
    }
});

// POST Route
router.post("/", (req, res) => {
    if (req.isAuthenticated()) {
        // Create aquarium entry
        console.log("req.body is", req.body);

        const sql = `
        INSERT INTO "aquarium" ("user_id", "name", "length", "width", "height", "note", "image_url")
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING "id";
        `;

        pool.query(sql, [
            req.user.id,
            req.body.name,
            req.body.length,
            req.body.width,
            req.body.height,
            req.body.note,
            req.body.image_url,
        ])
            .then((result) => {
                console.log("new aquarium id", result.rows[0].id, req.body); //ID IS HERE!
                console.log(req.body.product);

                const newAquariumId = result.rows[0].id;
                // Add products into table
                const sql2 = `
            INSERT INTO "product" ("aquarium_id", "description", "cost", "product_type_id")
            VALUES ($1, $2, $3, $4);
            `;
                // req.body.product is an array of all the selected genre_ids
                // iterate through each one, sending our query above until
                // we have an entry for each genre_id
                for (let i = 0; req.body.product.length > i; i++) {
                    //convert productTypes
                    switch (req.body.product[i].productType) {
                        case "livestock":
                            req.body.product[i].productType = 1;
                            break;
                        case "plant":
                            req.body.product[i].productType = 2;
                            break;
                        case "rock":
                            req.body.product[i].productType = 3;
                            break;
                        case "driftwood":
                            req.body.product[i].productType = 4;
                            break;
                        case "substrate":
                            req.body.product[i].productType = 5;
                            break;
                    }
                    // SECOND QUERY ADDS PRODUCT PROPERTIES
                    pool.query(sql2, [
                        newAquariumId,
                        req.body.product[i].typeDescription,
                        req.body.product[i].cost,
                        req.body.product[i].productType,
                    ]);
                }
            })
            .then(() => {
                res.sendStatus(201);
            })
            .catch((e) => {
                console.log(e);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403); // Send Forbidden if the user is not authenticated to POST aquariums to this account
    }
});

// DELETE Route
router.delete("/:id", (req, res) => {
    if (req.isAuthenticated()) {
        const sql = `DELETE FROM "aquarium" WHERE "id" = $1 and "user_id" = $2`;
        pool.query(sql, [req.params.id, req.user.id])
            .then((result) => {
                res.sendStatus(201);
            })
            .catch((e) => {
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403); // Send Forbidden if user is not authenticated to DELETE aquarium on this account
    }
});

// PUT Route
router.put("/:id", (req, res) => {
    if (req.isAuthenticated()) {
        const sql = `
        UPDATE "aquarium"
        SET "name" = $1,
        "length" = $2,
        "width" = $3,
        "height" = $4,
        "note" = $5,
        "image_url" = $6,
        "user_id" = $7
        WHERE "id" = $8
        `;

        pool.query(sql, [
            req.body.name,
            req.body.length,
            req.body.width,
            req.body.height,
            req.body.note,
            req.body.image_url,
            req.user.id,
            req.params.id,
        ])
            .then((result) => {
                res.sendStatus(201);
            })
            .catch((e) => {
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403); // Send Forbidden if user is not authenticated to PUT aquarium on this account
    }
});

// Don't forget to export this!
module.exports = router;
