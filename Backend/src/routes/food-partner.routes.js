const express = require("express");
const { authFoodMiddleware } = require("../middlewares/auth.middleware");
const { getFoodPartnerById } = require("../controllers/food-partner.controller");

const router = express.Router();

router.get("/:id", authFoodMiddleware, getFoodPartnerById);

module.exports = router;
