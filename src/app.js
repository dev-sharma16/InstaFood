require("dotenv").config();
const express = require("express");
const authRoutes = require("../src/routes/auth.routes");
const cookieParser = require('cookie-parser');

const app = express();

app.use("/auth",authRoutes);
app.use(cookieParser());
app.use(express.json());

module.exports = app;
