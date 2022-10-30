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

// This obtains the last entered id from the product table
// We will use this when we are editing the products
// So that there are no accidental replacements when a new product is created/added
router.get("/last", (req, res) => {
    if (req.isAuthenticated()) {
        const sql = `
        SELECT COALESCE(MAX(id), 0) + 1 as id FROM "product"`;

        pool.query(sql)
            .then((result) => {
                // console.log(result.rows[0].id);
                // result.rows = result.rows[0].id;
                // result.rows = result.rows[0].id;
                // console.log("what is rows", result.rows);

                res.send(result.rows[0]);
            })
            .catch((e) => {
                console.log("Error getting latest product id", e);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403); // Forbidden, need to be logged in
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
                // console.log("before", result.rows);

                for (let i = 0; result.rows.length > i; i++) {
                    result.rows[i].productType = result.rows[i].product_type_id;
                    result.rows[i].typeDescription = result.rows[i].description;
                    result.rows[i].productId = result.rows[i].id;
                    delete result.rows[i].product_type_id;
                    delete result.rows[i].description;
                }

                for (let i = 0; result.rows.length > i; i++) {
                    //convert productTypes
                    switch (result.rows[i].productType) {
                        case 1:
                            result.rows[i].productType = "Livestock";
                            break;
                        case 2:
                            result.rows[i].productType = "Plant";
                            break;
                        case 3:
                            result.rows[i].productType = "Rock";
                            break;
                        case 4:
                            result.rows[i].productType = "Driftwood";
                            break;
                        case 5:
                            result.rows[i].productType = "Substrate";
                            break;
                    }
                }
                // console.log("after", result.rows);

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
