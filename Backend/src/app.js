require("dotenv").config();
const express = require("express");
const authRoutes = require("../src/routes/auth.routes");
const foodRoutes = require("../src/routes/food.routes");
const cookieParser = require('cookie-parser');
const cors = require('cors')

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/food", foodRoutes);

module.exports = app;
