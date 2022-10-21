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

// GET Route by id
router.get("/:id", (req, res) => {
    const sql = `SELECT * FROM "aquarium" WHERE "id"=$1`;
    pool.query(sql, [req.params.id])
        .then((result) => {
            res.send(result.rows[0]);
        })
        .catch((e) => {
            console.log("Error getting specific aquarium", e);
            res.sendStatus(500);
        });
});

// POST Route
router.post("/", (req, res) => {
    const sql = `
    INSERT INTO "aquarium" ("name")
    VALUES ($1)
    `;

    pool.query(sql, [req.body.name])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((e) => {
            console.log(e);
            res.sendStatus(500);
        });
});

// DELETE Route
router.delete("/:id", (req, res) => {
    const sql = `DELETE FROM "aquarium" WHERE "id" = $1`;
    pool.query(sql, [req.params.id])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((e) => {
            res.sendStatus(500);
        });
});

// PUT Route
router.put("/:id", (req, res) => {
    console.log("req.body is", req.body);
    console.log("req.params.id is", req.params.id);

    const sql = `
    UPDATE "aquarium"
    SET "name" = $1
    WHERE "id" = $2
    `;

    pool.query(sql, [req.body.name, req.params.id])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((e) => {
            res.sendStatus(500);
        });
});

// Don't forget to export this!
module.exports = router;
