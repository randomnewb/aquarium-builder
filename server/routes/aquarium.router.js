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
    INSERT INTO "aquarium" ("user_id", "name", "length", "width", "height", "note", "image_url")
    VALUES ($1, $2, $3, $4, $5, $6, $7)
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
    console.log("req.user.id is", req.user.id);

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
});

// Don't forget to export this!
module.exports = router;
