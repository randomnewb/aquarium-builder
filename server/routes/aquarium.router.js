// We will need express, pool, and router from express.Router

const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// GET Route
// Add in something to only get logged in user's aquariums
router.get("/", (req, res) => {
    const sql = `SELECT * FROM "aquarium"`;
    pool.query(sql)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((e) => {
            console.log("Error getting all aquariums", e);
            res.sendStatus(500);
        });
});

// POST Route
router.post("/", (req, res) => {
    // POST route code here
});

// DELETE Route
router.delete("/:id", (req, res) => {
    // DELETE route code here
});

// PUT Route
router.put("/:id", (req, res) => {
    // PUT route code here
});

// Don't forget to export this!
module.exports = router;
