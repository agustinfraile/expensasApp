require("dotenv").config();
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const { conn } = require("./postgres.js");

const routes = require('./src/routes/index.js');

const { PORT } = process.env;

const server = express();
server.use(express.json());

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));

server.use(cors());

server.use(cookieParser());

server.use(morgan("dev"));


server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, DELETE"
    );
    next();
});

server.use("/", routes);


server.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});

conn.sync({ force: false }).then(() => {
    server.listen(PORT, () => {
        console.log(`escuchando en el puerto: ${PORT} 👂🏼`);
    });
});

module.exports = server;