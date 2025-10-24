const mariadb = require("mariadb");
const dotenv = require("dotenv");
dotenv.config({ path: ".env-local" });


const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});

// connect and check for errors

// Test simple de connexion
async function testConnection() {
  try {
    const connection = await pool.getConnection(); // se connecter
    console.log(" Database connection OK");
    connection.release(); // libérer la connexion
  } catch (err) {
    console.error(" Database connection error:", err.message);
  }
}

testConnection();



module.exports = pool ;


// pool.getConnection((err, connection) => {
//   if (err) {
//     if (err.code === "PROTOCOL_CONNECTION_LOST") {
//       console.error("Database connection lost");
//     }
//     if (err.code === "ER_CON_COUNT_ERROR") {
//       console.error("Database HAS MANY CONNECTION");
//     }
//     if (err.code === "ECONNREFUSED") {
//       console.error("Database connection WAS REFUSED");
//     }
//   }
//   if (connection) {connection.release()
//     console.log("connection OK")
//   };

//   return;
// });