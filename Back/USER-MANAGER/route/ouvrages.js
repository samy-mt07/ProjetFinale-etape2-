const express = require("express");
const router = express.Router();
const pool = require("../database/database");

// GET /api/ouvrages
router.get("/ouvrages", async (req, res) => {
  try {
   const result = await pool.query("SELECT * FROM ouvrages");
console.log(result);   
res.json(result);      


  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});



module.exports = router ;