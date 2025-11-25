// impoter express
const express = require("express");
const server = express();
const pool = require("./database/database");
const useRouter = require("./route/users");
const useAuth = require("./route/authoRoutes");
const dotenv = require("dotenv");
const path = require('path');
const ouvragesRoutes = require("./route/ouvrages");
const cors = require("cors");




server.use('/images', express.static(path.join(__dirname, 'public/images')));


dotenv.config({ path: ".env-local" });
const PORT = process.env.PORT || 8080;

// MiddelWare

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cors()); 



// definir le chemin

server.use("/api", useRouter);
server.use("/api", useAuth);

//server.use(useAuth);
server.use("/api", ouvragesRoutes);
//ecoute

server.listen(PORT, () => {
  console.log(`[API] http://localhost:${PORT}`);
});
