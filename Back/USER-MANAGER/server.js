// impoter express
const express = require("express");

// Instancier le serveur
const server = express();

// import pool
const pool = require("./database/database");

//importer module d' environement
const dotenv = require("dotenv");

dotenv.config({ path: ".env-local" });
const PORT = process.env.PORT || 8080;

// MiddelWare
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

//get / 
server.get('/',(req,res)=>{
    res.status(200).send("go to /users/:id and replace:id qith your user :");
}); 

// definir le chemin 
const useRouter = require("./route/users");
server.use("/users", useRouter);


//ecoute

server.listen(PORT, () => {
  console.log(`[API] http://localhost:${PORT}`);
});


