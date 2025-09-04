require("dotenv").config();
const express = require("express");
const authRoutes = require("../src/routes/auth.routes");
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/auth",authRoutes);

module.exports = app;
