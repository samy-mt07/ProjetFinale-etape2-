const express = require("express");
const router = express.Router();
const pool = require("../database/database");

router.get("/users", async (req, res) => {
  try {
    const sqlQuery = "SELECT * FROM `users`";
    const rows = await pool.query(sqlQuery);
    //  console.log(rows);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
