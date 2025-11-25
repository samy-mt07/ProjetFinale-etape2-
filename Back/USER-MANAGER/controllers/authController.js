const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../database/database");
require("dotenv").config({ path: ".env-local" });

// genere un token JWT
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
  );
}

module.exports.login_get = (req, res) => {
  res.send("Page login test OK");
};

module.exports.signup_get = (req, res) => {
  console.log("signup_get route hit");
  res.send("Page signup_get test OK");
};
module.exports.signup_post = async (req, res) => {
  try {
    const { nom, email, password_hash } = req.body;
    const encryptedPasswod = await bcrypt.hash(password_hash, 10);
    const sqlQuery =
      "INSERT INTO users (nom, email, password_hash) VALUES (?,?,?)";
    const result = await pool.query(sqlQuery, [nom, email, encryptedPasswod]);
    

    // Recu^p du nouvel utilisateur pour le token
    const user = {
      id: result.insertId.toString(),
      email,
      role: "client",
    };

    // genere du token JWT
    const token = generateToken(user);

    res.status(200).json({
      message: "Utilisateur créé avec succès",
      userId: user.id,
      token,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};


module.exports.login_post = async (req, res) => {
  try {
    const { email, password_hash } = req.body;

    console.log("Email reçu :", email);
    console.log("Mot de passe reçu :", password_hash);

    if (!email || !password_hash) {
      return res.status(400).json({ message: "Email et mot de passe requis" });
    }

    // Recherche de l'utilisateur
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    console.log("Rows trouvées :", rows);

    if (rows.length === 0) {
      return res.status(400).json({ message: "Utilisateur non trouvé" });
    }

    const user = rows ;
    console.log("User trouvé :", user);

    // Compare mot de passe
    const valid = await bcrypt.compare(password_hash, user.password_hash);
    console.log("Mot de passe valide ?", valid);

    if (!valid) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    // Generation du token  du token
    console.log("JWT_SECRET :", process.env.JWT_SECRET);
    const token = generateToken(user);
    console.log("Token généré :", token);

    res.status(200).json({
      message: "Connexion réussie",
      userId: user.id,
      nom: user.nom,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error("Erreur login :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
