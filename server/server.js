const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const expressJwt = require("express-jwt");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
var cors = require("cors");
const secret = "6$Sz249eF18@MKy1N";
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(require("./routes/api/UsersRouter"));

// Connect Database
connectDB();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.get("/", (req, res) => res.send("Hello world!"));

const port = process.env.PORT|| 5555;

app.listen(port, () => console.log(`Server running on port ${port}`));
