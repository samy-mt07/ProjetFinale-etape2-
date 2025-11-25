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


async function testConnection() {
  try {
    const connection = await pool.getConnection(); 
    console.log(" Database connection OK");
    connection.release(); 
  } catch (err) {
    console.error(" Database connection error:", err.message);
  }
}

testConnection();



module.exports = pool ;


