const express = require("express");
const router = express.Router();
const pool = require("../database/database");

router.get("/:id", async (req, res) => {
  try {
    const sqlQuery =
      "SELECT id, nom, email, password_hash, role, created_at, updated_at FROM users WHERE id=?";
    const rows = await pool.query(sqlQuery, req.params.id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { nom, email, password_hash } = req.body;

    const sqlQuery =
      "INSERT INTO users (nom, email, password_hash) VALUES (?,?,?)";
    const result = await pool.query(sqlQuery, [nom, email, password_hash]);
    res.status(200).json({
      userId: result.insertId,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
